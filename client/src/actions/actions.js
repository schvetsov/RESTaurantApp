export const CHANGEINPUT = 'CHANGEINPUT';
export const GEOLOCATION = 'GEOLOCATION';
export const YELPRESPONSE = 'YELPRESPONSE';
export const SELECTED = 'SELECTED';
export const DIRECTIONS = 'DIRECTIONS';

export function changeInput(value) {
    return { 
        type: CHANGEINPUT, 
        value: value
    }
};

export function getCoordinates(value) {
    return { 
        type: GEOLOCATION, 
        value: value
    }
};

export function yelpSearch(value) {
    return { 
        type: YELPRESPONSE, 
        value: value
    }
};

export function updateSelection(value) {
    return { 
        type: SELECTED, 
        value: value
    }
};

export function updateDirections(value) {
    return { 
        type: DIRECTIONS, 
        value: value
    }
};
