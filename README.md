<p align="center">
  <img src="https://raw.githubusercontent.com/peteboothroyd/Dragoman/master/resources/dragoman-logo.png" height="64">
  <h3 align="center">Dragoman</h3>
  <p align="center">An open source GUI for polyglot, a universal gRPC client<p>
</p>


## Overview
This project is based on the [react-typescript-electron-boilerplate](https://github.com/iRath96/electron-react-typescript-boilerplate) project. It is powered by [Electron](https://electron.atom.io/).

## Screenshot
![Dragoman Demo](https://raw.githubusercontent.com/peteboothroyd/Dragoman/master/resources/dragoman-demo.gif)

## Known Issues
The current material design library has typescript definition issues. In the meantime the TypeScript definition files can be fixed manually to allow compilation and building. I am investigating moving to [material-ui](http://www.material-ui.com/#/).

## Getting Started
To get start clone the repo:
```bash
git clone https://github.com/peteboothroyd/Dragoman.git your-project-name
```
And then install dependencies.
```bash
$ cd your-project-name && npm install
```

## Run

Run these two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

## DevTools

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

*See [electron-debug](https://github.com/sindresorhus/electron-debug) for more information.*

#### DevTools extension

This boilerplate is included following DevTools extensions:

* [Devtron](https://github.com/electron/devtron) - Install via [electron-debug](https://github.com/sindresorhus/electron-debug).
* [React Developer Tools](https://github.com/facebook/react-devtools) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
* 
You can find the tabs on Chrome DevTools.

If you want to update extensions version, please set `UPGRADE_EXTENSIONS` env, just run:

```bash
# For macOS
$ UPGRADE_EXTENSIONS=1 npm run dev

# For Windows
$ set UPGRADE_EXTENSIONS=1 && npm run dev
```
## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

## Further commands

To run the application without packaging run

```bash
$ npm run build
$ npm start
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```
