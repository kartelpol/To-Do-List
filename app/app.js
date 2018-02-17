import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';
import styled from 'styled-components';
import App from 'components/App';

import reducer from 'reducer';


const history = createHistory();
export const initialState = {categories: [], tasks: [], searchValue: ''};

const store = createStore(reducer, initialState, applyMiddleware(thunk));



  ReactDOM.render(

    <Provider store={store}>
        <ConnectedRouter history = {history}>
          <Router>
            <Route component = {App}/>
          </Router>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );




// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
