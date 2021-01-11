import burgerBuilderReducer from "./burgerBuilderReducer";
import * as actionTypes from '../actions/actionTypes';

describe('burgerBuilderReducer', () => {
    const INGREDIENT_PRICES = {
        salad: 0.50,
        cheese: 0.40,
        meat: 1.30,
        bacon: 0.70
    };

    const initialState = {
        ingredients: null,
        totalPrice: 4,
        error: false,
        building: false
    };

    it('should return the initial state when the state is just getting setup at the beginning of our app', () => {
        expect(burgerBuilderReducer(undefined, {})).toEqual(initialState);
    });

    it('should add an ingredient when pressing the add button', () => {
        const beforeAddIngredientState = {
            ingredients: {
                salad: 0,
                cheese: 0,
                meat: 0,
                bacon: 0
            },
            totalPrice: 4,
            error: false,
            building: false
        };

        const afterAddIngredientState = {
            ingredients: {
                salad: 1,
                cheese: 0,
                meat: 0,
                bacon: 0
            },
            totalPrice: '4.50',
            error: false,
            building: true
        };

        expect(burgerBuilderReducer(beforeAddIngredientState, {
            type: actionTypes.ADD_INGREDIENT,
            payload: {
                ingredientName: 'salad'
            }
        })).toEqual(afterAddIngredientState);
    });

    it('should remove an ingredient when pressing the remove button', () => {
        const beforeAddIngredientState = {
            ingredients: {
                salad: 1,
                cheese: 0,
                meat: 0,
                bacon: 0
            },
            totalPrice: 4.5,
            error: false,
            building: false
        };

        const afterAddIngredientState = {
            ingredients: {
                salad: 0,
                cheese: 0,
                meat: 0,
                bacon: 0
            },
            totalPrice: '4.00',
            error: false,
            building: true
        };

        expect(burgerBuilderReducer(beforeAddIngredientState, {
            type: actionTypes.REMOVE_INGREDIENT,
            payload: {
                ingredientName: 'salad'
            }
        })).toEqual(afterAddIngredientState);
    });

});