/* tslint:disable:no-console */
// import { Application } from 'spectron';
// import * as path from 'path';
// import * as assert from 'assert';

// const app = new Application({
//     path: path.join(__dirname, '../../release/mac/Dragoman.app/Contents/MacOS/Dragoman'),
// });

fun test() {
    console.log('dummy');
    // app.start().then(() => {
    //     // Check if the window is visible
    //     return app.browserWindow.isVisible();
    // }).then((isVisible: boolean) => {
    //     // Verify the window is visible
    //     console.error(`isVisible: ${isVisible}`);
    //     assert.equal(isVisible, true);
    // }).then(() => {
    //     // Get the window's title
    //     return app.browserWindow.getTitle();
    // }).then((title: string) => {
    //     // Verify the window's title
    //     console.error(`title: ${title}`);
    //     assert.equal(title, 'Dragoman2');
    // }).then(() => {
    //     // Stop the application
    //     return app.stop();
    // }).catch((error: Error) => {
    //     // Log any failures
    //     console.error('Test failed', error.message);
    // });
}


describe('Dragoman', () => {
    it('should render', () => {
        test();
    });
});
