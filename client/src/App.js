import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import HeaderAuth from './components/auth/HeaderAuth';
import './theme/styles/materialize.min.css';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import { Provider } from 'react-redux';
import store from './state/store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
    <Router>
    <Fragment>
        <Route path='/' render= { ()=><HeaderAuth /> } />
        <Switch>
        <Route path='/login' render= { ()=><LoginPage /> } />
        <Route path='/register' render= { ()=><RegisterPage /> } />
        </Switch>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
