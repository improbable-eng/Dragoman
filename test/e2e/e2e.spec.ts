/* tslint:disable:no-console */
import { Application } from 'spectron';
import * as path from 'path';

// const app = new Application({
//     path: `${__dirname}/../../release/mac/Dragoman.app/Contents/MacOS/Dragoman`,
// });

// describe('application launch', () => {
//     it('shows an initial window', () => {
//         return app.start().then(() => {
//             // Check if the window is visible
//             return app.browserWindow.isVisible();
//         }).then((isVisible) => {
//             // Verify the window is visible
//             console.error(isVisible);
//             assert.equal(isVisible, true);
//         }).then(() => {
//             // Get the window's title
//             return app.client.getTitle();
//         }).then((title) => {
//             // Verify the window's title
//             assert.equal(title, 'My App');
//         }).then(() => {
//             // Stop the application
//             return app.stop();
//         });
//     });
// });

describe('main window', function spec() {
    let app: Application;
    beforeAll(() => {
        let pathToBinary;

        switch (process.platform) {
            case 'linux':
                pathToBinary = path.join(__dirname, '../../release/linux-unpacked/dragoman');
                break;

            case 'darwin':
                pathToBinary = path.join(__dirname, '../../release/mac/Dragoman.app/Contents/MacOS/Dragoman');
                break;

            case 'win32':
                pathToBinary = path.join(__dirname, '../release/win-unpacked/Dragoman.exe');
                break;

            default:
                throw new Error('Path to the built binary needs to be defined for this platform in test/index.js');
        }

        app = new Application({
            path: pathToBinary,
        });
        return app.start();
    });

    afterAll(() => {
        if (app && app.isRunning()) {
            return app.stop();
        } else {
            return;
        }
    });

    it('should open a window', () => {
        // delay(1000);
        const { client, browserWindow } = app;
        // console.error('openwindow', app.isRunning());

        return client.waitUntilWindowLoaded()
        .then(() => { return browserWindow.webContents.isDevToolsOpened(); })
        .then((isDevToolsOpen) => {
            expect(isDevToolsOpen).toBe(false);
        });
    });

    it('should have a title', async () => {
        const { client, browserWindow } = app;

        await client.waitUntilWindowLoaded();
        const title = await browserWindow.getTitle();
        console.error(title);
        expect(title).toBe('Dragoman');
    });
});
