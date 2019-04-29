import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import List from './List';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<List />', () => {
    it('renders', () => {
        const wrapper = shallow(<List />);
        expect(wrapper.exists()).toBe(true);
    });
});
