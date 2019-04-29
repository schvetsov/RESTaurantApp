import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import NavBar from './NavBar';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<NavBar />', () => {
    it('renders', () => {
        const wrapper = shallow(<NavBar />);
        expect(wrapper.exists()).toBe(true);
    });
});
