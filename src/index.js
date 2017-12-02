import 'bootstrap/less/bootstrap.less';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';
import App from './components/app';
import lang from './lang';

const language = document.querySelector('html').lang;
window.lang = lang[language];

ReactDOM.render(
  <App />,
  document.querySelector('.application'),
);
