const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const url = require('url');
const path = require('path'); // eslint-disable-line
const { spawn } = require('child_process');

const LIST_SERVICES_REQUEST = "LIST_SERVICES_REQUEST";
const LIST_SERVICES_RESPONSE = "LIST_SERVICES_RESPONSE";
const CALL_SERVICE_REQUEST = "CALL_SERVICE_REQUEST";
const CALL_SERVICE_RESPONSE = "CALL_SERVICE_RESPONSE";

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
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
    pathToPolyglotBinary = "/Users/peteboothroyd/Projects/polyglotGUI/polyglot/bazel-bin/src/main/java/me/" +
        "dinowernli/grpc/polyglot/polyglot_deploy.jar";
}



// TODO: Add use_tls flag 
ipcMain.on(LIST_SERVICES_REQUEST, (event, listServicesRequest) => {
    (function() {
        var childProcess = require("child_process");
        var oldSpawn = childProcess.spawn;
        function mySpawn() {
            console.log('spawn called');
            console.log(arguments);
            var result = oldSpawn.apply(this, arguments);
            return result;
        }
        childProcess.spawn = mySpawn;
    })();

    console.log(listServicesRequest);
    const { polyglotSettings, listServicesOptions } = listServicesRequest;

    // Build polyglot command
    const command = 'java'; 
    const commandLineArgs = ['-jar', pathToPolyglotBinary, '--command=list_services', '--with_message=true', '--list_output_format=json'];
    if (polyglotSettings.protoDiscoveryRoot !== "") commandLineArgs.push(' --proto_discovery_root=' + polyglotSettings.protoDiscoveryRoot);
    if (listServicesOptions.serviceFilter !== "") commandLineArgs.push('--service_filter=' + listServicesOptions.serviceFilter);
    if (listServicesOptions.methodFilter !== "") commandLineArgs.push('--method_filter=' + listServicesOptions.methodFilter);
    if (polyglotSettings.configSetPath !== "") commandLineArgs.push('--config_set_path=' + polyglotSettings.configSetPath);
    if (polyglotSettings.configName !== "") commandLineArgs.push('--config_name=' + polyglotSettings.configName);
    if (polyglotSettings.addProtocIncludes !== "") commandLineArgs.push('--add_protoc_includes=' + polyglotSettings.addProtocIncludes);
    if (polyglotSettings.deadlineMs !== 0) commandLineArgs.push('--deadline_ms=' + polyglotSettings.deadlineMs);
    if (polyglotSettings.tlsCaCertPath !== "") commandLineArgs.push('--tls_ca_certificate=' + polyglotSettings.tlsCaCertPath);

    console.log(`Command: ${command} Args: ${commandLineArgs}`);

    const polyglot = spawn(command, commandLineArgs);
    var polyglotStderr = "";
    var polyglotStdout = "";

    polyglot.stderr.on('data', (data) => {
        polyglotStderr += data;
    });

    polyglot.stdout.on('data', (data) => {
        polyglotStdout += data;
    });

    polyglot.on('close', (code) => {
        console.log(`code: ${code}\n`);
        if (code !== 0){
            console.warn("err: ", err, ". stderr: ", stderr);
            event.sender.send(LIST_SERVICES_RESPONSE, { error: code, response: polyglotStderr });
        } else {
            event.sender.send(LIST_SERVICES_RESPONSE, { error: null, response: polyglotStdout });
        }
    });
});

// TODO: Pass settings object rather than all of these params
ipcMain.on(CALL_SERVICE_REQUEST, (event, callServiceRequest) => {
    const { polyglotSettings, callServiceOptions } = callServiceRequest;

    const echoCommandLineArgs = [callServiceOptions.jsonBody];
    const echo = spawn("echo", echoCommandLineArgs);
    console.log(`Echo Args: ${echoCommandLineArgs}`);

    // Build polyglot command
    const javaCommand = 'java'; 
    const javaCommandLineArgs = ['-jar', pathToPolyglotBinary, '--command=call'];

    if(polyglotSettings.protoDiscoveryRoot !== "") javaCommandLineArgs.push('--proto_discovery_root=' + polyglotSettings.protoDiscoveryRoot);
    if(polyglotSettings.configSetPath !== "") javaCommandLineArgs.push('--config_set_path=' + polyglotSettings.configSetPath);
    if(polyglotSettings.configName !== "") javaCommandLineArgs.push('--config_name=' + polyglotSettings.configName);
    if(polyglotSettings.addProtocIncludes !== "") javaCommandLineArgs.push('--add_protoc_includes=' + polyglotSettings.addProtocIncludes);
    if(polyglotSettings.deadlineMs !== 0) javaCommandLineArgs.push('--deadline_ms=' + polyglotSettings.deadlineMs);
    if(polyglotSettings.tlsCaCertPath !== "") javaCommandLineArgs.push('--tls_ca_certificate=' + polyglotSettings.tlsCaCertPath);
    if(polyglotSettings.endpoint !== "") javaCommandLineArgs.push('--endpoint=' + polyglotSettings.endpoint);
    if(callServiceOptions.fullMethod !== "") javaCommandLineArgs.push('--full_method=' + callServiceOptions.fullMethod);

    console.log(`Java Command: ${javaCommand} Args: ${javaCommandLineArgs}`);

    const polyglot = spawn(javaCommand, javaCommandLineArgs);

    echo.stdout.on('data', (data) => {
        console.log(`echoStdOut: ${data}\n`);
        polyglot.stdin.write(data);
    });

    echo.stderr.on('data', (data) => {
        console.log(`echoStdErr: ${data}`);
    });

    echo.on('close', (code) => {
        console.log(`echoCode: ${code}\n`);
        if(code === 0){
            polyglot.stdin.end();
        }
    }); 

    var polyglotStderr = "";
    var polyglotStdout = "";

    polyglot.stderr.on('data', (data) => {
        console.log(`polyglotStdErr: ${data}\n`);
        polyglotStderr = data;
    });

    polyglot.stdout.on('data', (data) => {
        console.log(`polyglotStdOut: ${data}\n`);
        polyglotStdout = data;
    });

    polyglot.on('close', (code) => {
        console.log(`code: ${code}\n`);
        if (code !== 0){
            console.warn("err: ", code, ". stderr: ", polyglotStderr);
            event.sender.send(CALL_SERVICE_RESPONSE, { error: code, response: polyglotStderr }); 
        } else {
            if (polyglotStdout === '' && polyglotStderr !== '') {
                // Is this the best way to do this? The text of Error is meant to be a stack trace.
                event.sender.send(CALL_SERVICE_RESPONSE, { error: new Error('Error'), response: polyglotStderr });
            }
            console.log(`Sending back call service response ${polyglotStdout}`);
            event.sender.send(CALL_SERVICE_RESPONSE, { error: null, response: polyglotStdout });
        } 
    });

    //TODO: integrate this back
    // (err, stdout, stderr) => {
    //     // console.log('err: ', err, '\nstdout: ', stdout, '\nstderr: ', stderr);
    //     if (err) {
    //         event.sender.send(CALL_SERVICE_RESPONSE, { error: err, response: stderr });
    //     } else {
    //         // TODO: Investigate, when polyglot gets an error and err = nil how best to test for this and
    //         // report to users?
    //         if (stdout === '' && stderr !== '') {
    //             // Is this the best way to do this? The text of Error is meant to be a stack trace.
    //             event.sender.send(CALL_SERVICE_RESPONSE, { error: new Error('Error'), response: stderr });
    //         }
    //         event.sender.send(CALL_SERVICE_RESPONSE, { error: err, response: stdout });
    //     }
    // });
});

//****************************************************************//