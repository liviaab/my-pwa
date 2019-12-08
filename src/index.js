import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// We want our app to work offline and load faster, so we have to change
// unregister() to register() below.
// A serviceWorker.js file is already created
// Change the "/public/manifest.json" if needed
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
