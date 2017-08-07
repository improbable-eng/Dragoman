import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from './containers/appContainer';

import './index.css';
import './index.scss';
import './ace.css';

import WebFontLoader from 'webfontloader';

const {ipcRenderer} = window.require('electron');

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(<AppContainer ipcRenderer={ipcRenderer}/>, document.getElementById('root'));