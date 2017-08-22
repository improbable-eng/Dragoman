const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const url = require('url');
const path = require('path'); 
const { spawn } = require('child_process');
const { accessSync } = require('fs');

const ipcConstants = require('./constants/ipcConstants'); 

const DEV_PATH_TO_POLYGLOT_BINARY = "/Users/peteboothroyd/Projects/polyglotGUI/polyglot/bazel-bin/src/main/java/me/" +
                                    "dinowernli/grpc/polyglot/polyglot_deploy.jar";

let mainWindow;

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support'); 
    sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
    require('electron-debug')(); 
    const p = path.join(__dirname, '..', 'app', 'node_modules'); 
    require('module').globalPaths.push(p); 
}

const installExtensions = () => {
    if (process.env.NODE_ENV === 'development') {
        const installer = require('electron-devtools-installer');

        const extensions = [
            "REACT_DEVELOPER_TOOLS"
            // 'REDUX_DEVTOOLS'
        ];
        const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
        return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload)));
    }

    return Promise.resolve([]);
};

const createWindow = () => {
    console.log("creating window");
    mainWindow = new BrowserWindow({
        show: false,
        width: 2000,
        height: 1400
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

    setupElectronMenu()
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

const setupElectronMenu = () => {
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
                { type: 'separator' },
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' }
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

//*** Calling polyglot and returning results to browser window ***//

let pathToPolyglotBinary;

// Keep references to the child process we spawn, we can kill them in the future if we need
let childProcesses = {};

if (process.env.NODE_ENV === "development") {
    pathToPolyglotBinary = DEV_PATH_TO_POLYGLOT_BINARY;
} else {
    pathToPolyglotBinary = path.join(__dirname, "polyglot_deploy.jar").replace('app.asar', 'app.asar.unpacked');
}

// TODO: Add use_tls flag 
ipcMain.on(ipcConstants.LIST_SERVICES_REQUEST, (event, listServicesRequest) => {

    console.log(listServicesRequest);
    const { polyglotSettings, listServicesOptions } = listServicesRequest;

    // Build polyglot command
    const polyglotCommand = 'java'; 
    const polyglotCommandLineArgs = ['-jar', pathToPolyglotBinary, '--command=list_services', '--with_message=true', '--list_output_format=json'];
    if (polyglotSettings.protoDiscoveryRoot !== "") polyglotCommandLineArgs.push(' --proto_discovery_root=' + polyglotSettings.protoDiscoveryRoot);
    if (listServicesOptions.serviceFilter !== "") polyglotCommandLineArgs.push('--service_filter=' + listServicesOptions.serviceFilter);
    if (listServicesOptions.methodFilter !== "") polyglotCommandLineArgs.push('--method_filter=' + listServicesOptions.methodFilter);
    if (polyglotSettings.configSetPath !== "") polyglotCommandLineArgs.push('--config_set_path=' + polyglotSettings.configSetPath);
    if (polyglotSettings.configName !== "") polyglotCommandLineArgs.push('--config_name=' + polyglotSettings.configName);
    if (polyglotSettings.addProtocIncludes !== "") polyglotCommandLineArgs.push('--add_protoc_includes=' + polyglotSettings.addProtocIncludes);
    if (polyglotSettings.deadlineMs > 0) polyglotCommandLineArgs.push('--deadline_ms=' + polyglotSettings.deadlineMs);
    if (polyglotSettings.tlsCaCertPath !== "") polyglotCommandLineArgs.push('--tls_ca_certificate=' + polyglotSettings.tlsCaCertPath);

    event.sender.send(ipcConstants.POST_LOGS, {log: "Running polyglot command " + polyglotCommand + " " + polyglotCommandLineArgs.join(" "), level: "info"});

    console.log(`Command: ${polyglotCommand} Args: ${polyglotCommandLineArgs}`);

    var polyglot = spawn(polyglotCommand, polyglotCommandLineArgs);
    childProcesses[polyglot.pid] = polyglot;

    var polyglotStderr = "";
    var polyglotStdout = "";

    polyglot.stderr.on('data', (data) => {
        polyglotStderr += data;
        event.sender.send(ipcConstants.POST_LOGS, {log: data, level: "warn"});
    });

    polyglot.stdout.on('data', (data) => {
        polyglotStdout += data;
    });

    polyglot.on('close', (code) => {
        delete childProcesses[polyglot.pid];
        console.log(`Polyglot command closing with code: ${code}\n`);
        if (code !== 0){
            console.warn("err: ", err, ". stderr: ", stderr);
            event.sender.send(ipcConstants.LIST_SERVICES_RESPONSE, { error: code, response: polyglotStderr });
        } else {
            event.sender.send(ipcConstants.LIST_SERVICES_RESPONSE, { error: null, response: polyglotStdout });
        }
    });
});

ipcMain.on(ipcConstants.CALL_SERVICE_REQUEST, (event, callServiceRequest) => {
    const { polyglotSettings, callServiceOptions } = callServiceRequest;

    const echoCommandLineArgs = [callServiceOptions.jsonBody];
    var echo = spawn("echo", echoCommandLineArgs);
    childProcesses[echo.pid] = echo;
    console.log("echo spawned ", echo);

    // Build polyglot command
    const javaCommand = 'java'; 
    const javaCommandLineArgs = ['-jar', pathToPolyglotBinary, '--command=call'];

    if(polyglotSettings.protoDiscoveryRoot !== "") javaCommandLineArgs.push('--proto_discovery_root=' + polyglotSettings.protoDiscoveryRoot);
    if(polyglotSettings.configSetPath !== "") javaCommandLineArgs.push('--config_set_path=' + polyglotSettings.configSetPath);
    if(polyglotSettings.configName !== "") javaCommandLineArgs.push('--config_name=' + polyglotSettings.configName);
    if(polyglotSettings.addProtocIncludes !== "") javaCommandLineArgs.push('--add_protoc_includes=' + polyglotSettings.addProtocIncludes);
    if(polyglotSettings.deadlineMs > 0) javaCommandLineArgs.push('--deadline_ms=' + polyglotSettings.deadlineMs);
    if(polyglotSettings.tlsCaCertPath !== "") javaCommandLineArgs.push('--tls_ca_certificate=' + polyglotSettings.tlsCaCertPath);
    if(polyglotSettings.endpoint !== "") javaCommandLineArgs.push('--endpoint=' + polyglotSettings.endpoint);
    if(callServiceOptions.fullMethod !== "") javaCommandLineArgs.push('--full_method=' + callServiceOptions.fullMethod);

    event.sender.send(ipcConstants.POST_LOGS, {log: "Running command " + javaCommand + " " + javaCommandLineArgs.join(" "), level: "info"});

    var polyglot = spawn(javaCommand, javaCommandLineArgs);
    console.log("polyglot spawned with id ", polyglot.pid, polyglot.stdio.pause);
    childProcesses[polyglot.pid] = polyglot;

    var echoStdErr = ""

    echo.stdout.on('data', (data) => {
        polyglot.stdin.write(data);
    });

    echo.stderr.on('data', (data) => {
        console.error(`echoStdErr: ${data}`);
        echoStdErr += data;   
    });

    echo.on('close', (code) => {
        console.log(`echo closing with code: ${code}\n`);
        delete childProcesses[echo.pid];
        if(code === 0){
            polyglot.stdin.end();
        } else {
            event.sender.send(ipcConstants.CALL_SERVICE_RESPONSE, 
                {error: new Error("Error with echo piping json into polyglot"), response: echoStdErr});  
        }
    }); 

    var polyglotStderr = "";
    var polyglotStdout = "";

    polyglot.stderr.on('data', (data) => {
        console.warn(`polyglotStdErr: ${data}`);
        polyglotStderr += data;
        event.sender.send(ipcConstants.POST_LOGS, {log: data, level: "warn"});
    });

    polyglot.stdout.on('data', (data) => {
        polyglotStdout += data;
    });

    polyglot.on('close', (code) => {
        console.log(`polyglot closing with code: ${code}\n`);
        delete childProcesses[polyglot.pid];

        if (code !== 0){
            event.sender.send(ipcConstants.CALL_SERVICE_RESPONSE, { error: code, response: polyglotStderr }); 
        } else {
            if (polyglotStdout === '' && polyglotStderr !== '') {
                // Sometimes the code is 0 but polyglot has had an error. Is this the best way to do this? The text of Error is meant to be a stack trace.
                event.sender.send(ipcConstants.CALL_SERVICE_RESPONSE, { error: new Error('Error'), response: polyglotStderr });
            }
            event.sender.send(ipcConstants.CALL_SERVICE_RESPONSE, { error: null, response: polyglotStdout });
        } 
    });
});

//****************************************************************//

//******* Node process communication for renderer process ********//

/* A method for checking if local paths are valid, takes a list of strings and should return a list of booleans which correspond to 
   the validity of the path. Identical indices should correspond such that the boolean at index i represents the validity of path at
   index i. The id is passed straight back to allow the renderer to identify which component sent the request */

ipcMain.on(ipcConstants.VALIDATE_PATHS_REQUEST, (event, validatePathsRequest) => {
    console.log("Request to validate paths: ", validatePathsRequest);
    var validPathList = [];
    for(i = 0; i < validatePathsRequest.paths.length; i++) {
        try {
            accessSync(validatePathsRequest.paths[i]);
            validPathList.push(true);
        } catch (err) {
            console.warn("path ", validatePathsRequest.paths[i] ," does not exist");
            validPathList.push(false); 
        }
    }
    console.log(validPathList);
    event.sender.send(ipcConstants.VALIDATE_PATHS_RESPONSE, {id: validatePathsRequest.id, validPaths: validPathList});
});

function killChildProcess(event) {
    console.warn("Killing current child process\n", childProcesses);
    var successfullyKilled = true;

    for (var procId in childProcesses) {
        childProcesses[procId].kill(); 
        if (!childProcesses[procId].killed) {
            successfullyKilled = false;
        } else {
            delete childProcesses[procId];
        }
    }
    
    console.warn("Processes killed successfully: ", successfullyKilled);
    event.sender.send(ipcConstants.CANCEL_REQUEST_RESPONSE, successfullyKilled);
}

ipcMain.on(ipcConstants.CANCEL_REQUEST, killChildProcess);

//****************************************************************//
