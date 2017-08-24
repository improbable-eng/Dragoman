import { Store } from 'redux';

let configureStore: (initialState?: object) => Store<object | void>;

if (process.env.NODE_ENV === 'production') {
  configureStore = require('./configureStore.production').default; //tslint:disable-line 
} else {
  configureStore = require('./configureStore.development').default; //tslint:disable-line  
}

export default configureStore;
