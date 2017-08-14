import { app, BrowserWindow, shell, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { PolyglotRequestOptions, PolyglotSettings, 
  ListServicesOptions, CallServiceOptions } from '../src/types/index';

// Module to allow execution of command line processes
import { exec } from 'child_process';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null;

function createWindow() { 
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1600, height: 800 });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  if (process.env.ELECTRON_ENV === 'dev') {
    console.log('Running in development');
    mainWindow.webContents.openDevTools();
  } else {
    console.log('Running in production');
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  setUpMenu();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// *** Calling polyglot and returning results to browser window ***//

var pathToPolyglotBinary = path.join(__dirname, 'polyglot_deploy.jar').replace('app.asar', 'app.asar.unpacked');

if (process.env.ELECTRON_ENV === 'dev') {
  pathToPolyglotBinary = '/Users/peteboothroyd/Projects/polyglotGUI/polyglot/bazel-bin/src/main/java/me/' +
    'dinowernli/grpc/polyglot/polyglot_deploy.jar';
}

// TODO: Update to reflect change of output flag
// TODO: Pass settings object rather than all of these params
exports.listServices = (polyglotSettings: PolyglotSettings, polyglotRequestOptions: PolyglotRequestOptions, 
                        listServicesOptions: ListServicesOptions, callback: (err: Error, reply: string) => void) => {
  const command = ' --command=list_services --with_message=true --json_output=true ' +
  (polyglotSettings.protoDiscoveryRoot === undefined ? '' :
   ' --proto_discovery_root=' + polyglotSettings.protoDiscoveryRoot) +
  (listServicesOptions.serviceFilter === undefined ? '' : ' --service_filter=' + listServicesOptions.serviceFilter) +
  (listServicesOptions.methodFilter === undefined ? '' : ' --method_filter=' + listServicesOptions.methodFilter) +
  (polyglotSettings.configSetPath === undefined ? '' : ' --config_set_path=' + polyglotSettings.configSetPath) +
  (polyglotSettings.configName === undefined ? '' : ' --config_name=' + polyglotSettings.configName) +
  (polyglotSettings.addProtocIncludes === undefined ? '' :
   ' --add_protoc_includes=' + polyglotSettings.addProtocIncludes) +
  (polyglotSettings.deadlineMs === undefined ? '' : ' --deadline_ms=' + polyglotSettings.deadlineMs) +
  (polyglotSettings.tlsCaCertPath === undefined ? '' : ' --tls_ca_certificate=' + polyglotSettings.tlsCaCertPath);

  console.log('Command: ', command);

  exec(command, (err, stdout, stderr) => {
      if (err) {
        callback(err, stderr);
      } else {
        callback(err, stdout);
      }
    });
};

// TODO: Pass settings object rather than all of these params
exports.callService = (polyglotSettings: PolyglotSettings, polyglotRequestOptions: PolyglotRequestOptions, 
                       callServiceOptions: CallServiceOptions, callback: (err: Error, reply: string) => void) => {

  var command = 'echo \'' + callServiceOptions.jsonRequest + '\' | java -jar ' + pathToPolyglotBinary +
    ' --command=call ' + 
    (polyglotSettings.endpoint === undefined ? '' :  ' --endpoint=' + polyglotSettings.endpoint) + 
    (polyglotRequestOptions.fullMethod === undefined ? '' : ' --full_method=' + polyglotRequestOptions.fullMethod) +
    (polyglotSettings.protoDiscoveryRoot === undefined ? '' : 
    ' --proto_discovery_root=' + polyglotSettings.protoDiscoveryRoot) +
    (polyglotSettings.configSetPath === undefined ? '' : ' --config_set_path=' + polyglotSettings.configSetPath) +
    (polyglotSettings.configName === undefined ? '' : ' --config_name=' + polyglotSettings.configName) +
    (polyglotSettings.addProtocIncludes === undefined ? '' :
     ' --add_protoc_includes=' + polyglotSettings.addProtocIncludes) +
    (polyglotSettings.deadlineMs === undefined ? '' : ' --deadline_ms=' + polyglotSettings.deadlineMs) +
    (polyglotSettings.tlsCaCertPath === undefined ? '' : ' --tls_ca_certificate=' + polyglotSettings.tlsCaCertPath);

  console.log('Command: ', command);

  exec(command,
       (err, stdout, stderr) => {
      // console.log('err: ', err, '\nstdout: ', stdout, '\nstderr: ', stderr);
      if (err) {
        callback(err, stderr);
      } else {
        // TODO: Investigate, when polyglot gets an error and err = nil how best to test for this and
        // report to users?
        if (stdout === '' && stderr !== '') {
          // Is this the best way to do this? The text of Error is meant to be a stack trace.
          callback(new Error('Error'), stderr); 
        }
        callback(err, stdout);
      }
    });
};

// **************************************************************** //

// *********************** Setting up menu ************************ //
function setUpMenu() {
  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() { shell.openExternal('https://github.com/peteboothroyd/Dragoman'); }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });

    // Window men
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ];
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template as Electron.MenuItemConstructorOptions[]));
}
// ****************************************************************//