import React from "react";
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import {BurgerBuilder} from "./BurgerBuilder";

import {configure, shallow} from 'enzyme';
// It allows to connect Enzyme to React v16.x
import Adapter from 'enzyme-adapter-react-16';

// Connecting Enzyme to React v16.x
configure({adapter: new Adapter()});


describe('<BurgerBuilder/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onFetchInitialIngredients={() => {
        }}/>);
    });

    it('should render one <BuildControls /> container if the ingredients are present', () => {
        wrapper.setProps({ingredients: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should not render a <BuildControls /> container if the ingredients are not present', () => {
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });


});