import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { calculate } from './store/actions'
import {LOCAL_STORAGE_KEY} from './store/constants/index'
import './index.css';
import {saveState} from './utils'



render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)


setInterval(() => {store.dispatch(calculate({timestamp: Date.now()}))}, 200);
setInterval(() => {saveState(LOCAL_STORAGE_KEY, store.getState().game);}, 5000);
