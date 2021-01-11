import OrderFormReducer from "./OrderFormReducer";
import * as actionTypes from '../actions/actionTypes';

describe('OrderFormReducer', () => {
    const initialState = {
        orders: [],
        loading: false,
        purchased: false,
        errors: null
    };

    it('should return the initial state when the state is just getting setup at the beginning of our app', () => {
        expect(OrderFormReducer(undefined, {})).toEqual(initialState);
    });

    

    // it('should add an ingredient when pressing the add button', () => {
    //     const beforeAddIngredientState = {
    //         ingredients: {
    //             salad: 0,
    //             cheese: 0,
    //             meat: 0,
    //             bacon: 0
    //         },
    //         totalPrice: 4,
    //         error: false,
    //         building: false
    //     };
    //
    //     const afterAddIngredientState = {
    //         ingredients: {
    //             salad: 1,
    //             cheese: 0,
    //             meat: 0,
    //             bacon: 0
    //         },
    //         totalPrice: '4.50',
    //         error: false,
    //         building: true
    //     };
    //
    //     expect(OrderFormReducer(beforeAddIngredientState, {
    //         type: actionTypes.ADD_INGREDIENT,
    //         payload: {
    //             ingredientName: 'salad'
    //         }
    //     })).toEqual(afterAddIngredientState);
    // });
    //
    // it('should remove an ingredient when pressing the remove button', () => {
    //     const beforeRemoveIngredientState = {
    //         ingredients: {
    //             salad: 1,
    //             cheese: 0,
    //             meat: 0,
    //             bacon: 0
    //         },
    //         totalPrice: 4.5,
    //         error: false,
    //         building: false
    //     };
    //
    //     const afterRemoveIngredientState = {
    //         ingredients: {
    //             salad: 0,
    //             cheese: 0,
    //             meat: 0,
    //             bacon: 0
    //         },
    //         totalPrice: '4.00',
    //         error: false,
    //         building: true
    //     };
    //
    //     expect(OrderFormReducer(beforeRemoveIngredientState, {
    //         type: actionTypes.REMOVE_INGREDIENT,
    //         payload: {
    //             ingredientName: 'salad'
    //         }
    //     })).toEqual(afterRemoveIngredientState);
    // });
    //
    // it('should fetch the initial ingredients from scratch', () => {
    //     const afterSetIngredientsState = {
    //         ingredients: {
    //             salad: 0,
    //             cheese: 0,
    //             meat: 0,
    //             bacon: 0
    //         },
    //         totalPrice: 4,
    //         error: false,
    //         building: false
    //     };
    //
    //     expect(OrderFormReducer(initialState, {
    //         type: actionTypes.SET_INGREDIENTS,
    //         payload: {
    //             ingredients: {
    //                 salad: 0,
    //                 cheese: 0,
    //                 meat: 0,
    //                 bacon: 0
    //             }
    //         }
    //     })).toEqual(afterSetIngredientsState);
    // });
    //
    // it('should return a true value on the error field when error fetching the ingredients', () => {
    //     const afterFetchIngredientsFailedState = {
    //         ingredients: null,
    //         totalPrice: 4,
    //         error: true,
    //         building: false
    //     };
    //
    //     expect(OrderFormReducer(initialState, {
    //         type: actionTypes.FETCH_INGREDIENTS_FAILED
    //     })).toEqual(afterFetchIngredientsFailedState);
    // });

});