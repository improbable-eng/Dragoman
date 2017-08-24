let configureStore: any;

// if (process.env.NODE_ENV === 'production') {
//   configureStore = require('./configureStore.production'); //tslint:disable-line
// } else {
//   configureStore = require('./configureStore.development'); //tslint:disable-line
// }

configureStore = require('./configureStore.development'); //tslint:disable-line

export default configureStore;
