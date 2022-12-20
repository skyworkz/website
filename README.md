# Skyworkz website

This website is built using:

 * Hugo 0.73
 * Bootstrap 4
 * Font-awesome
 * Ion icons

## Development

### GitPod
The easiest way to work on the Skyworkz website is to use GitPod. GitPod offers a browser-based VSCode setup that has a completely pre-configured setup for the website, including a running Hugo development server. You can use GitPod free of charge with your Github account. To use Gitpod, hit the button below:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/skyworkz/website)

### Optional: using a Docker image for building the code
If for some reason, you can't or don't want to use Gitpod, you can use a local Docker setup. If you encounter problems when using `hugo` after `npm install` like `hugo` complaining about SASS stuff, you can use the bundled `Dockerfile` as follows:
```bash
docker build -t skyworkz .
docker run -it -v $(pwd):/website skyworkz "npm install"
docker run -it -v $(pwd):/website -p 1313:1313 skyworkz "hugo serve"
```
Now, you can make changed to the website and they will automatically be reflected in the dev server (accessed by navigating to `localhost:1313` as mentioned above.

### Optional: run your own local setup
First, make sure you get a Node 16.x setup, and install Hugo (extended) in the correct version. Then, run `npm install` to install all required node modules. Finally, run `hugo serve` to access the website at http://localhost:1313.

### Pre-commit
To use the supplied pre-commit hooks, run `pre-commit install`.

## Contributing
This website makes heavily use of Hugo for the content management. There are some guidelines to follow:

 * Use SASS/SCSS. Don't start modifying the `.css` files, only the `.scss`.
 * Install modules using NPM. This keeps our source repository clean.
 * Use Bootstrap as much as possible. Bootstrap is pretty powerful.

 ## Pull-request process
 To contribute content or code you need to create pull-request. We make use of `CODEOWNERS` for automatic assignment of pull-requests to ensure that your PR is reviewed by the most appropriate people in a timely manner.

## Questions / Maintainers
If you have any questions or want to discuss something with the maintainers team, feel free to join the `#skyworkz-website-maintainers` channel.

Currently, the maintainers team consists of:
- Bas
- Benny
- Lee
