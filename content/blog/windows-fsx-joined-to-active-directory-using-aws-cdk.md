---
id: blog
title: Deploying Windows FSx joined to an AD using AWS CDK
description: This blog describes how to join a Windows FSx file server to an AWS managed Active Directory using AWS CDK.
author: Nidhi Sharma
tags:
  - AWS CDK
  - Windows FSx
  - Active Directory
slug: windows-fsx-joined-to-ad-with-aws-cdk
date: 2023-02-25
---

In a Windows Server setup, it is common practice to use Active Directory for server and user management. For this purpose, you can create an AWS managed Active Directory. Any EC2 instances or other resources that you would like to manage should join the AD upon their creation. At a client, we had a setup that required a common file storage for sharing resources across our Windows EC2 instances. For this purpose, we used AWS FSx for Windows.

***Seems straightforward?***

It isn't due to how the provisioning of the AD's security group is handled internally by the AWS API. Let's see why.

### Roadblock coming ahead

To join the AD, certain ports from the FSx's security group should be whitelisted in the Inbound rules of the AD's security group. Marked below in red in the diagram. This basically means, before creating your FSx, you must have:

1. An Active Directory's ID
2. The AD's security group ID
3. The FSx's security group ID

When you create an AD, a security group is automatically assigned to the AD and you cannot assign a different security group to it. In addition to that, you cannot figure out the security group ID after the AD is created as it is not returned by the CDK API via any property or method.

{{<img src="/img/blog/blog-windows-fsx-joined-to-ad-with-aws-cdk-1.png" class="img-fluid" title="Whitelist ports on AD" >}}

### Figuring a way out

In scenarios where the CDK API isn't sufficient, AWS CDK Custom Resource comes to our rescue. This CDK Construct allows us to query the AWS API via a singleton Lambda function to make calls to gather information or perform actions that cannot be done via the CDK API. You can specify exactly which API calls are invoked for the 'CREATE', 'UPDATE' and 'DELETE' life cycle events.

By default, the Active Directory's security group has a fixed naming pattern: `<active-directory-id>_controllers`. So, we will use a CDK Custom Resource to make an AWS API call and fetch the AD's security group ID based on its name. We will then add an Inbound Rule in the AD's security group to allow traffic from the FSx's security group.

Our approach to create this setup is:

1. Create a security group for the FSx
2. Create an AWS managed AD
3. Import the AD's security group by ID (using an AWS CDK Custom Resource)
4. Add the ports from the FSx's security group in the Inbound Rules of the AD's security group
5. Finally, instantiate a new FSx server and assign it the security group created in step 1 so that it can join the AD

**NOTE** An easier way in this case would be to import the AD's security group by using its name as a lookup, but the idea here is to illustrate the usage of AWS CDK Custom Resource to make AWS API calls. If you would like to import the AD's security group by its name then use this [method](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SecurityGroup.html#static-fromwbrlookupwbrbywbrnamescope-id-securitygroupname-vpc) instead and skip Step 3. If using this approach, you will first have to search for the Active Directory ID from the AWS console and hard-code the value `<active-directory-id>_controllers` for the lookup to work. You cannot import the value of the AD ID from CFN Outputs and then use it for lookup, because tokens are not resolved during the construction and synthesis stage of the app's lifecycle. If you attempt doing it, the following error message will be returned: `Error: All arguments to look up a security group must be concrete (no Tokens)`.

### Cruising smoothly

The first thing you will notice when trying to deploy an AD or an FSx for Windows File Server is that there are no CDK L2 constructs for them!

So, instead use the L1 constructs. As you might know, these are low-level Constructs that correspond directly to the CloudFormation resources. With them, you work with exactly the same structures as in raw CloudFormation. Not so clean but this is a viable option.

***Note:*** Variables that contain IDs or configurable parameters are passed via the props Interface.
Feel free to replace them with your environment variables or actual values as you deem fit in your setup.

**Step 1:**
Create a security group for the FSx:

```ts
// File: lib/network/fsx-security-stack.ts

const securityGroup = new ec2.SecurityGroup(this, 'FSx-SecurityGroup', {
  vpc: props.vpc,
  description: 'Security Group for the FSx',
  allowAllOutbound: true,
});

// Export the Security Group's ID
new CfnOutput(this, 'FSx-SecurityGroupId', {
  description: 'Security Group ID of the FSx',
  value: securityGroup.securityGroupId,
  exportName: `${this.stackName}-SecurityGroupId`,
});
```

**Step 2:**
Create an AWS managed AD:

```ts
// File: lib/user-mgmt/directory-stack.ts

// Generate a pair of credentials for the admin user that will manage the AD
const directoryCredentials = new secretsmanager.Secret(this, 'DirectorySecret', {
  secretName: `${this.stackName}-directory-secret`,
  description: `${this.stackName} Directory Admin Password`,
  generateSecretString: {
    excludePunctuation: true,
    passwordLength: 20,
  },
});

const cfnAD = new ds.CfnMicrosoftAD(this, 'AD', {
  name: domainName,
  password: directoryCredentials.secretValue.toString(),
  edition: 'Standard',
  vpcSettings: {
    subnetIds: props.vpc.selectSubnets({
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      availabilityZones: ['eu-west-1a', 'eu-west-1b'],
    }).subnetIds,
    vpcId: props.vpc.vpcId,
  },
});

// Export the AD's ID
new CfnOutput(this, 'AD-ID', {
  description: 'Active Directory ID',
  value: cfnAD.ref,
  exportName: `${this.stackName}-ActiveDirectoryID`,
});
```

**Step 3:**
Import the AD's security group by its ID (using an AWS CDK Custom Resource):

```ts
// File: lib/custom-resources/directory-security-stack.ts

// Import the AD's ID
const directoryId = Fn.importValue('DirectoryStack-ActiveDirectoryID');

// Fetch the Active Directory's security group ID by making an AWS API call
 const customResource = new cr.AwsCustomResource(this, 'ADSecurityGroupId-CustomResource', {
   onUpdate: {
     // Will also be called for a CREATE event
     service: 'EC2',
     action: 'describeSecurityGroups',
     parameters: {
       Filters: [
         {
           Name: 'group-name',
           Values: [`${directoryId}_controllers`], // The Security Group's name is passed to fetch the Security Group's ID
         },
       ],
     },
     outputPaths: ['SecurityGroups.0.GroupId'],
     physicalResourceId: cr.PhysicalResourceId.of(Date.now().toString()),
     // Update physical ID to always fetch the latest version
   },
   policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
     resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
   }),
});

const securityGroupId = customResource.getResponseField('SecurityGroups.0.GroupId');
// Import AD's security group
const importedADSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(
  this,
  'importedADSecurityGroup',
  securityGroupId,
  { allowAllOutbound: true, mutable: true }
);
```

***Debugging Tip:***
To figure out the response keys returned by any AWS API call, you can check the Cloudwatch logs of the Lambda function created by the Custom Resource. You can find the Lambda function in the Resources tab of CloudFormation.

**Step 4:**
Add the ports from the FSx's security group in the Inbound Rules of the AD's security group

```ts
// File: lib/custom-resources/directory-security-stack.ts

// Add Ingress Rules in AD's security group.
const importedFsxSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(
  this,
  'FSxSecurityGroup',
  Fn.importValue(`FSxSecurityStack-SecurityGroupId`),
  { allowAllOutbound: true, mutable: true }
);

// For brevity, whitelisting all ports from the FSx's security group
importedADSecurityGroup.connections.allowFrom(importedFsxSecurityGroup, ec2.Port.allTcp(), 'Incoming traffic from FSx');


new CfnOutput(this, 'ADSecurityGroupId', {
  description: 'Security Group Id of the Active Directory',
  value: securityGroupId,
  exportName: `${this.stackName}-AD`,
});
```

**Step 5:**
Instantiate a new FSx server


```ts
// File: lib/storage/windows-fsx-stack.ts

// Get private subnet IDs
let subnetIds: string[] = [];
let deploymentType = props.environmentContext.windowsConfiguration.deploymentType;

if (deploymentType === 'MULTI_AZ_1') {
  // If deployment type is MULTI-AZ then FSx should be available in private_with_egress subnets
  subnetIds = props.vpc.selectSubnets({ subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS }).subnetIds;
}
else {
  // For SINGLE-AZ deployment, FSx should be available in private_with_egress subnet, we use eu-west-1a AZ
  let preferredSubnetId = props.vpc.selectSubnets({
    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
    availabilityZones: ['eu-west-1a'],
  }).subnetIds[0];

  subnetIds.push(preferredSubnetId);
  // preferredSubnetId is required only if the deployment type is SINGLE-AZ
  props.environmentContext.windowsConfiguration.preferredSubnetId = preferredSubnetId;
}

// Create Windows FSx
const cfnFileSystem = new fsx.CfnFileSystem(this, 'WindowsFileSystem', {
  fileSystemType: 'WINDOWS',
  subnetIds: subnetIds,
  securityGroupIds: [importedFsxSecurityGroup.securityGroupId],
  storageCapacity: props.environmentContext.fsxConfiguration.storageCapactiy,
  storageType: props.environmentContext.fsxConfiguration.storageType,
  windowsConfiguration: {
    ...props.environmentContext.windowsConfiguration,
    activeDirectoryId: props.activeDirectoryId,
    auditLogConfiguration: {
      ...props.environmentContext.auditLogConfiguration,
    },
  },
});
```
**Your app's entrypoint**

Putting it all together:

```ts
// File: bin/app.ts


const app = new App();

// Provision Active Directory
const directoryStack = new DirectoryStack(app, 'DirectoryStack', {
  ...defaultStackProps,
  vpc: vpcStack.vpc,
  envContext: environmentContext,
  description: 'Active Directory Stack',
});

// Configure the Active Directory's Default Security Group. Necessary for provisioning Windows FSx.
const customResource = new SecurityGroupADStack(app, 'ADSecurityStack', {
  ...defaultStackProps,
  vpc: vpcStack.vpc,
  directoryId: directoryStack.directoryId,
  description: 'Custom Resource Stack to configure the AD Security Group',
});

// Provision Windows FSx
const windowsFileSystemStack = new WindowsFileSystemStack(app, 'WindowsFSxStack', {
  ...defaultStackProps,
  vpc: vpcStack.vpc,
  activeDirectoryId: directoryStack.directoryId,
  description: 'Windows Filesystem Stack',
});
```

Your Windows FSx file server is now joined to your AWS managed Active Directory.
To start using the FSx storage from the EC2 instances joined to the same Active Directory, whitelist the instances' security group on port 445 in the Inbound Rules of the FSx's security group and you are good to go!

## References:

1. Amazon FSx:

https://aws.amazon.com/fsx/

2. CDK Active Directory:

https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_directoryservice.CfnMicrosoftAD.html

3. CDK Windows FSx:

https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_fsx.CfnFileSystem.html#windowsconfiguration-1

4. CDK Custom Resource:

https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.custom_resources.AwsCustomResource.html

5. SDK Describe EC2 Security Group:

https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeSecurityGroups-property
