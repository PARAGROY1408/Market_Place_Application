import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers/index' // default export so we dont need to destructure // we may dont write index so it also works..





// here we are gonna to have our redux store and we will pass that to our entire application
// in the createStore the 1st parameter we need to pass is the rootReducer that has all the reducer
const store=createStore(rootReducer,composeWithDevTools())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
