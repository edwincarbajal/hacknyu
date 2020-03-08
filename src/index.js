import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import 'react-circular-progressbar/dist/styles.css';

import Radar from 'radar-sdk-js';

Radar.initialize('prj_test_pk_05d6b72b6e991ff6956146a0869924d1f96e3ec9');

ReactDOM.render(<App />, document.getElementById('root'));

Radar.trackOnce((status, location, user, events) => {
    if (status === Radar.STATUS.SUCCESS) {
        console.log('it works.... I guess?')
    }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
