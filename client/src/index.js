import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
    input: '',
    origLat: 0,
    origLong: 0,
    result: [],
    selected: '',
    index: 0,
    directions: []
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case "CHANGEINPUT":
            return Object.assign({}, state, {
                input: action.value
            })
        case "GEOLOCATION":
            return Object.assign({}, state, {
                origLat: action.value.value1,
                origLong: action.value.value2
            })
        case "YELPRESPONSE":
            return Object.assign({}, state, {
                result: action.value.data,
                directions: action.value.directions
            })
        case "SELECTED":
            return Object.assign({}, state, {
                selected: action.value.data,
                index: action.value.index
            })
        case "DIRECTIONS":
        return Object.assign({}, state, {
                directions: action.value
            })
        default:
            return state;
    }
}

const store = createStore(reducer);

const App2 = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(<App2 />, document.getElementById('root'));

serviceWorker.unregister();
