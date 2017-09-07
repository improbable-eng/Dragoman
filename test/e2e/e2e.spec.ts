// /* tslint:disable:no-console */
// import { Application } from 'spectron';
// import * as path from 'path';

// const assert = require('assert');

// describe('application launch', function() {
//   let app: Application;
//   this.timeout(15000); //tslint:disable-line

//   beforeEach(() => {
//     app = new Application({
//       path: path.join(__dirname, '/../../../node_modules/.bin/electron'),
//       args: [path.join(__dirname, '/../../../app/main.js')],
//       webdriverLogPath: '/Users/peteboothroyd/Desktop',
//     });
//     return app.start();
//   });

//   afterEach(() => {
//     if (app && app.isRunning()) {
//       return app.stop();
//     } else {
//         return;
//     }
//   });

//   it('shows an initial window', () =>
//     app.client.getWindowCount().then(function(count: number) {
//       assert.equal(count, 1);
//     }),
//   );
// });

// // describe('main window', function spec() {
// //     let app: Application;
// //     beforeAll(() => {
// //         let pathToBinary;

// //         switch (process.platform) {
// //             case 'linux':
// //                 pathToBinary = path.join(__dirname, '../../release/linux-unpacked/dragoman');
// //                 break;

// //             case 'darwin':
// //                 pathToBinary = path.join(__dirname, '../../release/mac/Dragoman.app/Contents/MacOS/Dragoman');
// //                 break;

// //             case 'win32':
// //                 pathToBinary = path.join(__dirname, '../release/win-unpacked/Dragoman.exe');
// //                 break;

// //             default:
// //                 throw new Error('Path to the built binary needs to be defined for this platform in test/index.js');
// //         }

// //         app = new Application({
// //             path: pathToBinary,
// //             webdriverLogPath: '/Users/peteboothroyd/Desktop',
// //             chromeDriverLogPath: '/Users/peteboothroyd/Desktop',
// //         });
// //         return app.start();
// //     });

// //     afterAll(() => {
// //         if (app && app.isRunning()) {
// //             return app.stop();
// //         } else {
// //             return;
// //         }
// //     });

// //     it('should open a window', () => {
// //         // delay(1000);
// //         const { client, browserWindow } = app;
// //         // console.error('openwindow', app.isRunning());

// //         return client.waitUntilWindowLoaded()
// //         .then(() => { return browserWindow.webContents.isDevToolsOpened(); })
// //         .then((isDevToolsOpen) => {
// //             expect(isDevToolsOpen).toBe(false);
// //         });
// //     });

// //     it('should have a title', async () => {
// //         const { client, browserWindow } = app;

// //         await client.waitUntilWindowLoaded();
// //         const title = await browserWindow.getTitle();
// //         console.error(title);
// //         expect(title).toBe('Dragoman');
// //     });
// // });
