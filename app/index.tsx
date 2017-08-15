import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import './app.global.scss';
import * as WebFontLoader from 'webfontloader';

// Redux code
// const { configureStore, history } = require('./store/configureStore');
// const store = configureStore();

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

// render(
//       <Root />,
//     document.getElementById('root')
//   );
  
//   if ((module as any).hot) {
//     (module as any).hot.accept('./containers/Root', () => {
//       const NextRoot = require('./containers/Root').default;
//       render(
//           <NextRoot />,
//         document.getElementById('root')
//       );
//     });
//   }

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}