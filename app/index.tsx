import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as WebFontLoader from 'webfontloader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './app.global.scss';
// import configureStore from './store/configureStore';
import App from './containers/App';
import rootReducer, { AppState } from './reducers/index';
// const store = configureStore();

const store = createStore<AppState>(rootReducer);

// TODO: Don't want to load fonts from the web, they should be stored locally.
WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('root'));

if ((module as any).hot) {
  (module as any).hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('root'));
  });
}
