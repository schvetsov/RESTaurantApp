import * as actions from './actions';

describe('actions', () => {
    it('should create an action', () => {
        const value = 'random'
        const expectedAction = {
            type: actions.CHANGEINPUT,
            value
        }
        expect(actions.changeInput(value)).toEqual(expectedAction)
    });
    it('should create an action', () => {
        const value = 'random'
        const expectedAction = {
            type: actions.GEOLOCATION,
            value
        }
        expect(actions.getCoordinates(value)).toEqual(expectedAction)
    });
    it('should create an action', () => {
        const value = 'random'
        const expectedAction = {
            type: actions.YELPRESPONSE,
            value
        }
        expect(actions.yelpSearch(value)).toEqual(expectedAction)
    });
    it('should create an action', () => {
        const value = 'random'
        const expectedAction = {
            type: actions.SELECTED,
            value
        }
        expect(actions.updateSelection(value)).toEqual(expectedAction)
    });
    it('should create an action', () => {
        const value = 'random'
        const expectedAction = {
            type: actions.DIRECTIONS,
            value
        }
        expect(actions.updateDirections(value)).toEqual(expectedAction)
    });
    it('should create an action', () => {
        const value = 'random'
        const expectedAction = {
            type: actions.EXPANDDIRECTIONS,
            value
        }
        expect(actions.expandDirections(value)).toEqual(expectedAction)
    });
});
