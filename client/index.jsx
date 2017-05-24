
import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { routes } from './routes/routes.jsx';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import setAuthorizationToken from './utils/setAuthorizationToken.js';
import { setCurrentUser } from './actions/auth_action';
import jwtDecode from 'jwt-decode';
import App from './app.jsx';

// Create redux store with middleware. 
// Redux Thunk enable redux action creators returns a function. 
// Thunk is used to dispatch async calls within the action creators.
const createStoreWithMiddleWare = applyMiddleware(ReduxThunk)(createStore);
var store = createStoreWithMiddleWare(reducers);

// checks if jwtToken is kept in localStorage.
// if no token if found, the statement makes sure that 
// all user data is removed from storage. 

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
} else {
  setAuthorizationToken(false);
  store.dispatch(setCurrentUser({}));
}

/**
 * The provider is the way Redux is connected with React.
 * All children if the provider can ultimately be connected with redux. 
 */
ReactDOM.render(
  <Provider store={store} > 
    <App />
  </Provider>
  , document.getElementById('app')
);


//UNCOMMENT THIS PIECE OF CODE TO ENABLE TO HOT-RELOADING
if (module.hot) {
  module.hot.accept();
}
