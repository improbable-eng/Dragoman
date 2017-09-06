/* tslint:disable:no-console */
import * as path from 'path';

import { Application } from 'spectron';

// const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

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

    //   const findCounter = () => app.client.element('[data-tid='counter']');

    //   const findButtons = async () => {
    //     const { value } = await app.client.elements('[data-tclass='btn']');
    //     return value.map((btn: any) => btn.ELEMENT);
    //   };

    it('should open window', () => {
        // delay(1000);
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

    //   it('should navigate to Counter by 'to Counter' link', async () => {
    //     const { client } = app;

    //     await client.click('[data-tid='container'] > a');
    //     await delay(100);
    //     expect(await findCounter().getText()).toBe('0');
    //   });

    //   it('should display updated count after increment button click', async () => {
    //     const { client } = app;

    //     const buttons = await findButtons();
    //     await client.elementIdClick(buttons[0]);  // +
    //     expect(await findCounter().getText()).toBe('1');
    //   });

    //   it('should display updated count after descrement button click', async () => {
    //     const { client } = app;

    //     const buttons = await findButtons();
    //     await client.elementIdClick(buttons[1]);  // -
    //     expect(await findCounter().getText()).toBe('0');
    //   });

    //   it('shouldn\'t change if even and if odd button clicked', async () => {
    //     const { client } = app;

    //     const buttons = await findButtons();
    //     await client.elementIdClick(buttons[2]);  // odd
    //     expect(await findCounter().getText()).toBe('0');
    //   });

    //   it('should change if odd and if odd button clicked', async () => {
    //     const { client } = app;

    //     const buttons = await findButtons();
    //     await client.elementIdClick(buttons[0]);  // +
    //     await client.elementIdClick(buttons[2]);  // odd
    //     expect(await findCounter().getText()).toBe('2');
    //   });

    //   it('should change if async button clicked and a second later', async () => {
    //     const { client } = app;

    //     const buttons = await findButtons();
    //     await client.elementIdClick(buttons[3]);  // async
    //     expect(await findCounter().getText()).toBe('2');
    //     await delay(1000);
    //     expect(await findCounter().getText()).toBe('3');
    //   });

    //   it('should navigate to home using back button', async () => {
    //     const { client } = app;
    //     await client.element(
    //       '[data-tid='backButton'] > a'
    //     ).click();
    //     await delay(100);

    //     expect(
    //       await client.isExisting('[data-tid='container']')
    //     ).toBe(true);
    //   });
});
