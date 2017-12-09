import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCDvfpk4-XLwSst-gYiMv-0rxULvxyIzJ0",
    authDomain: "info343-final-project-b0d70.firebaseapp.com",
    databaseURL: "https://info343-final-project-b0d70.firebaseio.com",
    projectId: "info343-final-project-b0d70",
    storageBucket: "info343-final-project-b0d70.appspot.com",
    messagingSenderId: "304358019326"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
