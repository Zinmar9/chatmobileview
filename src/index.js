import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import LoginComponent  from './login/login'
import SignupComponent from './signup/signup'
import DashboardComponent from './dashboard/dashboard';

const firebase = require("firebase")
require("firebase/firestore")

firebase.initializeApp({
  apiKey: "AIzaSyDS-knD91grk11ncjxKIDIJ8kg5f3WMQKo",
  authDomain: "chatapp-41400.firebaseapp.com",
  databaseURL: "https://chatapp-41400.firebaseio.com",
  projectId: "chatapp-41400",
  storageBucket: "chatapp-41400.appspot.com",
  messagingSenderId: "83377735851",
  appId: "1:83377735851:web:d4c4535f522b1b1be78fee",
  measurementId: "G-HQYVDFKZ9G"
})

const routing =(
  <Router>
    <div id='routing-container'>
      <Route path='/chatmobileview' component={ LoginComponent  }></Route>
      <Route path='/login' component={ LoginComponent  }></Route>
      <Route path='/signup' component={ SignupComponent  }></Route>
      <Route path='/dashboard' component={ DashboardComponent}></Route>
      
    </div>
  </Router>
);
ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
