<p align="center">
<img src="https://raw.githubusercontent.com/improbable-eng/Dragoman/master/resources/dragoman-logo.png" height="64">
<h3 align="center">Dragoman</h3>
<p align="center">An open source GUI for polyglot, a universal gRPC client<p>
<p align="center"><a href="https://travis-ci.org/improbable-eng/Dragoman.svg?branch=master"><img src="https://travis-ci.org/improbable-eng/Dragoman.svg?branch=master" alt="Build Status"></a></p>
</p>

## Dragoman 
This is an open source project to allow easy debugging of gRPC services, and leverages [polyglot](https://github.com/grpc-ecosystem/polyglot). It is powered by [Electron](https://electron.atom.io/), [react](https://facebook.github.io/react/), [redux](http://redux.js.org/), [webpack](https://webpack.js.org/)

## Getting Started
### Prerequisites
- Polyglot requires java runtime 1.8.
- node >= 8.x
- npm >= 3.x

### Installing
- Download the latest version from the [releases](https://github.com/improbable-eng/Dragoman/releases) tab.
- Alternatively clone this repo, run ```npm run start```
- If you have no polyglot experience/setup consider reading through this [readme](https://github.com/grpc-ecosystem/polyglot).
- If you have used polyglot before you likely used a configuration file to persist settings, by default polylgot looks to ~/.polyglot/config.json.
- An example config might be (remember to insert the OAuth secret, path to refresh token, and update the proto discovery path and protoc include paths as appropriate): 
```json
{
  "configurations": [
    {
      "name": "production",
      "call_config": {
        "use_tls": "true",
        "oauth_config": {
          "refresh_token_credentials": {
            "token_endpoint_url": "https://my.auth.server/auth/v1/token",
            "client": {
              "id": "my_client_id",
              "secret": "{{INSERT CLIENT SECRET HERE}}"
            },
            "refresh_token_path": "{{INSERT PATH TO REFRESH TOKEN HERE}}"
          }
        }
      },
      "proto_config": {
        "proto_discovery_root": "/path/to/protos",
        "include_paths": [
          "path/to/protoc/include/1",
          "path/to/protoc/include/2"
        ]
      }
    }
  ]
}
```

## Known Issues
- Polyglot is known to hang if authentication fails, causing the request to hang indefinitely. Cancel the request, get a new refresh token and try again.
- Difficult to read service/method name

## Development
To get started clone the repo:
```bash
git clone https://github.com/improbable-eng/Dragoman.git your-project-name
```
And then install dependencies.
```bash
$ cd your-project-name && npm install
```

## Run

Run these two commands __simultaneously__ in different console tabs for hot module replacement.

```bash
$ npm run hot-server
$ npm run start-hot
```

To simply get going run: 
```bash
$ npm run start
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
* [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).

You can find the tabs on Chrome DevTools.

If you want to update extension versions, please set `UPGRADE_EXTENSIONS` env, just run:

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
$ npm run start
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```
