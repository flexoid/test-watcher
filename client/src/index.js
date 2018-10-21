import React from 'react';
import { render } from 'react-dom';
import 'bulma/css/bulma.css'
import App from './components/App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
import { fetchProjects } from './actions'
import websocketsMiddleware from './middleware/websockets'

import 'font-awesome/css/font-awesome.min.css';
import "./index.css"

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, websocketsMiddleware))
)

store.dispatch(fetchProjects())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
