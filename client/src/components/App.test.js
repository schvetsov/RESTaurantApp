import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
    it('renders', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBe(true);
    });
    // it('should not render <Card> if selection is empty', () => {
    //     const wrapper = shallow(<Detail />);
    //     expect(wrapper.find("[data-test='this-card']")).toHaveLength(0);
    // });
    // it('should render <Card> if selection isnt empty', () => {
    //     const wrapper = shallow(<Detail />);
    //     wrapper.setProps({
    //         selection : {
    //             firstName: 'Test'
    //         }
    //     })
    //     expect(wrapper.find("[data-test='this-card']"));
    // });
});
