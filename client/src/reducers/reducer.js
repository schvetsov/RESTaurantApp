import { CHANGEINPUT, 
         GEOLOCATION, 
         YELPRESPONSE, 
         SELECTED, 
         DIRECTIONS } from '../actions/actions';

const initialState = {
    input: '',
    origLat: 0,
    origLong: 0,
    result: [],
    selected: '',
    index: 0,
    directions: []
};

const reducer = (state = initialState, action) => {
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
                selected: action.value.selected,
                result: action.value.data,
                directions: [ ...action.value.directions]
            })
        case "SELECTED":
            return Object.assign({}, state, {
                selected: action.value.data,
                index: action.value.index
            })
        case "DIRECTIONS":
            return Object.assign({}, state, {
                directions: [
                    ...action.value.directions.slice(0,action.value.index),
                    action.value.directions[action.value.index] = action.value.directions[action.value.index],
                    ...action.value.directions.slice(action.value.index + 1)
                ]
            })
        default:
            return state;
    }
}

export default reducer;
