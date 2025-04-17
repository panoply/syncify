# Syncify ~ Dusk

A bare bones strap starting point for theme development using [Syncify](https://github.com/panoply/syncify).

### Showcasing

This strap demonstrates basic level configuration using a blank theme structure.

- Configuration defined within `package.json` file.
- Bundles TypeScript into JavaScript
- Bundles SASS into CSS
- Bundles SVG using SVGO and outputs as snippet
- Using project-level `.env` file for shop credentials

# Instructions

You can start hacking on this project by either forking and installing depedendencies or using the `sy create` command prompt. It is assumed that you have installed [@syncify/cli](https://github.com/panoply/syncify) as a global depencency on your computer and have access to store credentials.

- [Installation](https://syncify.sh/setup/installation/)
- [Authentication](https://syncify.sh/setup/authentication/)

## sy create

Open up your terminal and run the following command:

```bash
sy create dusk
```

## Commands

Couple of basic commands to use during development:

```bash
$ sy -w              # Runs Syncify in development watch mode
$ sy -w --hot        # Runs Syncify in development watch mode with hot reloads
$ sy -b              # Runs Syncify in build mode
$ sy -b --prod       # Runs Syncify in build mode with production output
```

# License

MIT
