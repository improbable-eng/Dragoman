import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from './containers/appContainer';
const {ipcRenderer} = window.require('electron');

import './index.css';
import './index.scss';
import './ace.css';

import WebFontLoader from 'webfontloader';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(<AppContainer ipcRenderer={ipcRenderer}/>, document.getElementById('root'));