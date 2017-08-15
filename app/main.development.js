const { app, BrowserWindow, Menu, shell } = require('electron');
const url = require('url');
const path = require('path'); // eslint-disable-line

const exec = require('child_process');

let menu;
let template;
let mainWindow;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

const installExtensions = () => {
  // console.log("intalling extensions, NODE_ENV=", process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      "REACT_DEVELOPER_TOOLS"
      // 'REDUX_DEVTOOLS'
    ];
    // console.log(extensions);
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload)));
  }

  return Promise.resolve([]);
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1600,
    height: 800
  });

  // and load the app.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/app.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
    mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.webContents.inspectElement(x, y);
        }
      }]).popup(mainWindow);
    });
  }

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
    }, {
      label: 'View',
      submenu: [
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        (process.env.NODE_ENV === 'development' &&
          { type: 'separator' },
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' }
        )
      ]
    }, {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }, {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          //TODO: Update this link to point to the dragoman github page
          click() { shell.openExternal('https://github.com/peteboothroyd/dragoman') }
        }]
    }];

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

    // Window menu
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  }
}

app.on('ready', () => {
  installExtensions()
    .then(createWindow(), () => {
      console.log("Error installing extensions");
    })
});

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

//*** Calling polyglot and returning results to browser window ***//
// var pathToPolyglotBinary = path.join(__dirname, "polyglot_deploy.jar").replace('app.asar', 'app.asar.unpacked');
var pathToPolyglotBinary;

if (process.env.NODE_ENV === "development") {
  pathToPolyglotBinary = "/Users/peteboothroyd/Projects/polyglotGUI/polyglot/bazel-bin/src/main/java/me/" +
    "dinowernli/grpc/polyglot/polyglot_deploy.jar";
}

// TODO: Update to reflect change of output flag
// TODO: Pass settings object rather than all of these params
exports.listServices = (polyglotSettings, polyglotRequestOptions,
  listServicesOptions, callback) => {
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
exports.callService = (polyglotSettings, polyglotRequestOptions,
  callServiceOptions, callback) => {
  var command = 'echo \'' + callServiceOptions.jsonRequest + '\' | java -jar ' + pathToPolyglotBinary +
    ' --command=call ' +
    (polyglotSettings.endpoint === undefined ? '' : ' --endpoint=' + polyglotSettings.endpoint) +
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

//****************************************************************//