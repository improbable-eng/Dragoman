const { app, BrowserWindow, Menu, shell, Notification } = require('electron');
const url = require('url');
const path = require('path');
const { spawn, exec } = require('child_process');
const { accessSync } = require('fs');
const { autoUpdater } = require('electron-updater');

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
            "REACT_DEVELOPER_TOOLS",
            'REDUX_DEVTOOLS'
        ];
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

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/app.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.webContents.on('will-navigate', ev => {
        ev.preventDefault()
    })

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
        .then(() => {
            if (process.env.NODE_ENV !== 'development') {
                autoUpdater.checkForUpdates()
            }
        });
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

autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update');
});

autoUpdater.on('update-available', (info) => {
    console.log('Update available.');
});

autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available.');
});

autoUpdater.on('error', (err) => {
    console.log('Error in auto-updater.', err);
    mainWindow.webContents.send('ga', '')
    // visitor.event('main', 'autoUpdate', 'error').send();
});

autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    console.log(log_message);
});

autoUpdater.on('update-downloaded', (info) => {
    // visitor.event('main', 'autoUpdate', 'updateDownloaded').send();
    console.log('Update downloaded');
    const myNotification = new Notification({
        title: 'Dragoman',
        subtitle: 'Auto Update',
        body: 'Updated downloaded, quit and install? ',
        icon: '../resources/dragoman-logo.png',
        actions: [{ text: 'Ok', type: 'button' }]
    });

    myNotification.show();

    myNotification.once('action', (event, index) => {
        console.log('Action clicked ', index)
        if (index === 0) { // Selected ok
            // visitor.event('main', 'autoUpdate', 'updatedInstalled').send();
            autoUpdater.quitAndInstall();
        }
    });
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