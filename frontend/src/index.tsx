import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './provider/theme';

const middleWare = [];
middleWare.push(thunk)

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});
if (process.env.NODE_ENV === 'development')
  middleWare.push(loggerMiddleware)



ReactDOM.render(<Provider store={createStore(reducers, compose(applyMiddleware(...middleWare)))}>
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
