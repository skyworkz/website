# Skyworkz website

This website is built using:

 * Hugo 0.55+
 * Bootstrap 4
 * Font-awesome
 * Ion icons

## Usage

First, run `npm install` to install all required node modules. Then run `hugo` to build all assets. Finally, run `hugo serve` to access the website at http://localhost:1313.

## Alternative
Use Gitpod: https://gitpod.io/#https://github.com/skyworkz/website

## Optional: using a Docker image for building the code
For some reason, `npm` does not work correctly on macOS (or Windows). If you encounter problems when using `hugo` after `npm install` like `hugo` complaining about SASS stuff, you can use the bundled `Dockerfile` as follows:
```bash
docker build -t skyworkz .
docker run -it -v $(pwd):/website skyworkz "npm install"
docker run -it -v $(pwd):/website -p 1313:1313 skyworkz "hugo serve"
```
Now, you can make changed to the website and they will automatically be reflected in the dev server (accessed by navigating to `localhost:1313` as mentioned above.
## Pre-commit
To use the supplied pre-commit hooks, run `pre-commit install`.

## Contributing

This website makes heavily use of Hugo for the content management. There are some guidelines to follow:

 * Use SASS/SCSS. Don't start modifying the `.css` files, only the `.scss`.
 * Install modules using NPM. This keeps our source repository clean.
 * Use Bootstrap as much as possible. Bootstrap is pretty powerfull.

## Questions

If you have any questions, ask Bas :)
