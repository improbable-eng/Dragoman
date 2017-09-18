/* tslint:disable:no-console */
import { Application } from 'spectron';
import * as path from 'path';

describe('main window', function spec() {
    let app: Application;
    beforeAll(() => {

        console.error(process.env.PORT);
        app = new Application({
            path: path.join(__dirname, '../../node_modules/.bin/electron'),
            args: [path.join(__dirname, '../../app/main.development.js')],
            webdriverLogPath: '/Users/peteboothroyd/Desktop',
            chromeDriverLogPath: '/Users/peteboothroyd/Desktop',
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
        const { client, browserWindow } = app;

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
