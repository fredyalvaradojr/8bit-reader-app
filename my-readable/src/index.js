import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'emotion'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import globalStyles from './utils/globalStyles';
import reducer from './reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
  ${globalStyles.normalize}

  body,
  html,
  #root {
    width: 100%;
    height:100%;
  }

  h1 {
    font-size: 1.125em;
    margin-bottom: 0.5em;
  }

  p {
    margin-bottom: 0.5em;
  }
`;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
