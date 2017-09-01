import { Store } from 'redux';

let configureStore: (initialState?: object) => Store<object | void>;

if (process.env.NODE_ENV === 'production') {
  configureStore = require('./configureStore.production').default;
} else {
  configureStore = require('./configureStore.development').default;
}

export default configureStore;
