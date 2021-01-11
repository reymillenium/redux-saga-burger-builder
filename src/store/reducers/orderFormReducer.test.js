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

    it('should reset purchased to false again when pressing continue', () => {
        const beforePurchaseInitState = {
            orders: [],
            loading: false,
            purchased: true,
            errors: null
        };

        const afterPurchaseInitState = {
            orders: [],
            loading: false,
            purchased: false,
            errors: null
        };

        expect(OrderFormReducer(beforePurchaseInitState, {
            type: actionTypes.PURCHASE_INIT
        })).toEqual(afterPurchaseInitState);
    });

    it('should set loading to true when starting to purchase a burger', () => {
        const afterPurchaseBurgerStartState = {
            orders: [],
            loading: true,
            purchased: false,
            errors: null
        };

        expect(OrderFormReducer(initialState, {
            type: actionTypes.PURCHASE_BURGER_START
        })).toEqual(afterPurchaseBurgerStartState);
    });

});