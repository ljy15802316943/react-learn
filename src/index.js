import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './views/App.js';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
