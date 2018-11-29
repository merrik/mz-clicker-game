import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { calculate } from './store/actions'
import {LOCAL_STORAGE_KEY} from './store/constants/index'
import './index.css';
import {saveState} from './utils'

let rootNode = document.getElementById("clicker_root");

if(!rootNode) {
  rootNode = document.createElement("div");
  const body = document.body;
  if (body !== null) {
    body.appendChild(rootNode);
  }
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootNode
);
let longTimeout = null;
const doCalc = () => {
  const calcDate = Date.now();
  if (longTimeout)
    clearTimeout(longTimeout)
  store.dispatch(calculate({timestamp: calcDate}))
  setTimeout(() => requestAnimationFrame(doCalc), 200)
  longTimeout = setTimeout(() => doCalc, 2000)
}
requestAnimationFrame(doCalc)
setInterval(() => {saveState(LOCAL_STORAGE_KEY, store.getState().game);}, 5000);
