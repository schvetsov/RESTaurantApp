import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import BigCard from './BigCard';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<BigCard />', () => {
    it('renders', () => {
        const wrapper = shallow(<BigCard />);
        expect(wrapper.exists()).toBe(true);
    });
});
