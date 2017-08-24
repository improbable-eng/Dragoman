import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer } from '../reducers/index';

// import * as uiSettingsActions from '../actions/uiSettings';

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
};

declare const module: NodeModule & {
  hot?: {
    accept(...args: any[]): any;
  },
};

// const actionCreators = Object.assign({}, uiSettingsActions, {
//   push
// });

const logger = (createLogger)({
  level: 'info',
  collapsed: true,
});

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    // actionCreators
  }) as any :
  compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger),
);

export = {
  configureStore(initialState: object | void) {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers')),
      );
    }

    return store;
  },
};
