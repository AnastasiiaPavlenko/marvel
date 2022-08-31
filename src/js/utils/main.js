import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
import appReducer from '../reducer/appReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import "core-js";
import "regenerator-runtime/runtime";

const store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )

const root = ReactDOM.createRoot(document.getElementById("table"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);