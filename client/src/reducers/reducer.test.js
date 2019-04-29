import reducer from './reducer';
import * as types from '../actions/actions';

describe('todos reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            input: '',
            origLat: 0,
            origLong: 0,
            result: [],
            selected: '',
            index: 0,
            directions: [],
            expanded: false
        })
    })

    it('should handle CHANGEINPUT', () => {
        expect(
            reducer([], {
                type: types.CHANGEINPUT,
                value: 'test'
            })
        ).toEqual({
            input: 'test'
        })
    })

    it('should handle GEOLOCATION', () => {
        expect(
            reducer([], {
                type: types.GEOLOCATION,
                value: {
                    value1: 'test1',
                    value2: 'test2'
                }
            })
        ).toEqual({
            origLat: 'test1',
            origLong: 'test2'
        })
    })

    it('should handle YELPRESPONSE', () => {
        expect(
            reducer([], {
                type: types.YELPRESPONSE,
                value: {
                    selected: 'test1',
                    data: 'test2',
                    directions: [1,2,3]
                }
            })
        ).toEqual({
            selected: 'test1',
            result: 'test2',
            directions: [1,2,3]
        })
    })

    it('should handle SELECTED', () => {
        expect(
            reducer([], {
                type: types.SELECTED,
                value: {
                    data: [1,2,3],
                    index: 1
                }
            })
        ).toEqual({
            selected: [1,2,3],
            index: 1
        })
    })

    it('should handle DIRECTIONS', () => {
        expect(
            reducer([], {
                type: types.DIRECTIONS,
                value: {
                    directions: [1,2,3],
                    index: 1
                }
            })
        ).toEqual({
            directions: [1,2,3]
        })
    })

    it('should handle EXPANDDIRECTIONS', () => {
        expect(
            reducer([], {
                type: types.EXPANDDIRECTIONS,
                value: 'test'
            })
        ).toEqual({
            expanded: 'test'
        })
    })

})