import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "emotion";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import WebFont from "webfontloader";
import globalStyles from "./utils/globalStyles";
import reducer from "./reducers";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

WebFont.load({
  google: {
    families: ["Bungee:400", "Nunito+Sans:400"]
  }
});

injectGlobal`
  ${globalStyles.normalize}

  body,
  html,
  #root {
    width: 100%;
    height:100%;
  }

  body {
    font-family: 'Nunito Sans', sans-serif;
  }

  h1 {
    font-size: 1.125em;
    margin-bottom: 0.5em;
  }

  p {
    margin-bottom: 0.5em;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }
`;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
