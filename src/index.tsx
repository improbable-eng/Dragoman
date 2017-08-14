import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from './containers/appContainer';

import './index.css';
import './index.scss';
import './ace.css';

import * as WebFontLoader from 'webfontloader';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(<AppContainer />, document.getElementById('root') as HTMLElement);