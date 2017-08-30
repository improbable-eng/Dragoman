<p align="center">
  <img src="https://raw.githubusercontent.com/peteboothroyd/Dragoman/master/resources/dragoman-logo.png" height="64">
  <h3 align="center">Dragoman</h3>
  <p align="center">An open source GUI for polyglot, a universal gRPC client<p>
  <p align="center"><a href="https://travis-ci.org/peteboothroyd/Dragoman.svg?branch=master"><img src="https://travis-ci.org/peteboothroyd/Dragoman.svg?branch=master" alt="Build Status"></a></p>
</p>

## Overview
This project is based on the [react-typescript-electron-boilerplate](https://github.com/iRath96/electron-react-typescript-boilerplate) project. It is powered by [Electron](https://electron.atom.io/).

# How to use:
- Polyglot by default looks to ~/.polyglot/config.pb.json for its configuration. Define settings here for or override them in the UI.
- Note not all settings can be defined in the UI currently.
- An example config might be (remember to insert the OAuth secret, path to refresh token, and update the proto discovery paths as appropriate): 
```json
{
	"configurations": [
		{
			"name": "production",
			"call_config": {
				"use_tls": "true",
				"oauth_config": {
					"refresh_token_credentials": {
						"token_endpoint_url": "https://auth.improbable.io/auth/v1/token",
						"client": {
							"id": "improbable_cli_client_go",
							"secret": "{{INSERT CLIENT SECRET HERE}}"
						},
						"refresh_token_path": "{{INSERT PATH TO REFRESH TOKEN HERE}}"
					}
				}
			},
			"proto_config": {
				"proto_discovery_root": "/Users/peteboothroyd/Projects/platform/proto",
				"include_paths": [
					"/Users/peteboothroyd/Projects/platform/go/src",
					"/Users/peteboothroyd/Projects/platform/go/src/github.com/gogo/protobuf/protobuf",
					"/Users/peteboothroyd/Projects/platform/go/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis"
				]
			}
		}
	]
}
```
- Logs can be viewed from View/Toggle Developer Tools/Console. 

## Known Issues
### Run
- Polyglot is known to hang if authentication fails, causing the request to soin indefinitely. Get a new refresh token, reload the page and try again.
- Text editors do not resize
- Run request button is not centered
- No option to define whether to use TLS or not yet
- No filtering of services/methods yet
### Build
- The current material design library has typescript definition issues. In the meantime the TypeScript definition files can be fixed manually to allow compilation and building. I am investigating moving to [material-ui](http://www.material-ui.com/#/).

## Screenshot
![Dragoman Demo](https://raw.githubusercontent.com/peteboothroyd/Dragoman/master/resources/dragoman-demo.gif)

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
