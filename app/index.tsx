/* tslint:disable:no-console */
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as WebFontLoader from 'webfontloader';
import { Provider } from 'react-redux';

const electronCookies = require('@exponent/electron-cookies');
electronCookies.enable({origin: 'https://improbable.io.dragoman'});

import './app.global.scss';
import configureStore from './store/configureStore';
import App from './containers/app';

const store = configureStore();

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
  (module as any).hot.accept('./containers/app', () => {
    const NextApp = require('./containers/app').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('root'));
  });
}
