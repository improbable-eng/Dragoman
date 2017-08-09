const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1600, height: 800});

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  if (process.env.ELECTRON_ENV && process.env.ELECTRON_ENV === "dev") {
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

//*** Calling polyglot and returning results to browser window ***//

//Module to handle asynchronous requests
const ipcMain = electron.ipcMain;
//Module to allow execution of command line processes
const { exec } = require('child_process');

const pathToPolyglotBinary = path.join(__dirname, "polyglot_deploy.jar").replace('app.asar', 'app.asar.unpacked');
const devpathToPolyglotBinary = "/Users/peteboothroyd/Projects/polyglotGUI/polyglot/bazel-bin/src/main/java/me/"
  + "dinowernli/grpc/polyglot/polyglot_deploy.jar";

ipcMain.on('list-services', (event, protoDiscoveryRoot, serviceFilter, methodFilter) => {
    const command = "java -jar " + devpathToPolyglotBinary + " --command=list_services --with_message=true --json_output=true " + 
    "--proto_discovery_root=" + protoDiscoveryRoot +  " --service_filter=" + serviceFilter + 
    " --method_filter=" + methodFilter;
    console.log("Command: ", command);
    exec(command,
    (err, stdout, stderr) => {
      console.log("err: ", err, "\nstdout: ", stdout, "\nstderr: ", stderr);
      if (err) {
        console.log("ERROR");
        event.sender.send('list-services-reply', err, stderr);
      } else {
        console.log("FINE");
        event.sender.send('list-services-reply', err, stdout);
      }
    }
  );
});

ipcMain.on('call-service', (event, protoDiscoveryRoot, jsonRequest, endpoint, fullMethod) => {
    const command = "echo \"" + jsonRequest + "\" | java -jar " + devpathToPolyglotBinary +
      " --command=call --proto_discovery_root=" + protoDiscoveryRoot + " --endpoint=" + endpoint + 
      " --full_method=" + fullMethod;
    console.log("Command: ", command);
    exec(command,
    (err, stdout, stderr) => {
      console.log("err: ", err, "\nstdout: ", stdout, "\nstderr: ", stderr);
      if(err){
        event.sender.send('call-service-reply', err, stderr);
      } else {
        event.sender.send('call-service-reply', err, stdout);
      }
    }
  );
});

//****************************************************************//

function setUpMenu() {
  //*** Setting up menu ***//
  const Menu = electron.Menu;

  const template = [
    {
      label: 'Edit',
      submenu: [
        // {role: 'undo'},
        // {role: 'redo'},
        // {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          //TODO: Update this link to point to the dragoman github page
          click () { require('electron').shell.openExternal('https://electron.atom.io') }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    })

    // Window menu
    template[3].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'}
    ]
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
//****************************************************************//