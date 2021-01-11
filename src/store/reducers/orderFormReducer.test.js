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

    it('should add a new order and set several values when success purchasing a burger', () => {
        const orderID = "-MQj44W5K8QfwHXn0KwK";
        const order = {
            "ingredients": {
                "bacon": 1,
                "cheese": 1,
                "meat": 1,
                "salad": 1
            },
            "price": "6.90",
            "orderData": {
                "name": "Reinier Garcia",
                "street": "101 SW 36th CT APT 807",
                "zipCode": "33135",
                "country": "United States",
                "email": "reymillenium@gmail.com",
                "deliveryMethod": "fastest"
            },
            "userId": "yH5Ib18dsRXquneMgwQZJObUL0E2",
            "id": "-MQj44W5K8QfwHXn0KwK"
        }

        const afterPurchaseBurgerSuccessState = {
            orders: [order],
            loading: false,
            purchased: true,
            errors: null
        };

        expect(OrderFormReducer(initialState, {
            type: actionTypes.PURCHASE_BURGER_SUCCESS,
            payload: {
                orderID: orderID,
                order: order
            }
        })).toEqual(afterPurchaseBurgerSuccessState);
    });

    it('should set loading in false when an error is found purchasing a burger', () => {
        const afterPurchaseBurgerFailsState = {
            orders: [],
            loading: false,
            purchased: false,
            errors: null
        };

        // Is not storing the error currently (change it?)
        expect(OrderFormReducer(initialState, {
            type: actionTypes.PURCHASE_BURGER_FAIL,
            payload: {
                error: 'some-error'
            }
        })).toEqual(afterPurchaseBurgerFailsState);
    });

    it('should set loading in true when it starts fetching the orders', () => {
        const afterFetchOrdersStartState = {
            orders: [],
            loading: true,
            purchased: false,
            errors: null
        };

        expect(OrderFormReducer(initialState, {
            type: actionTypes.FETCH_ORDERS_START
        })).toEqual(afterFetchOrdersStartState);
    });

    it('should store the orders when there is success fetching the orders', () => {
        const orders = [
            {
                "ingredients": {
                    "bacon": 0,
                    "cheese": 0,
                    "meat": 0,
                    "salad": 3
                },
                "orderData": {
                    "country": "United States",
                    "deliveryMethod": "fastest",
                    "email": "reymillenium@gmail.com",
                    "name": "Reinier Garcia",
                    "street": "101 SW 36th CT APT 807",
                    "zipCode": "33135"
                },
                "price": "5.50",
                "userId": "yH5Ib18dsRXquneMgwQZJObUL0E2",
                "id": "-MOzpau708ZfjPVFeNs5"
            },
            {
                "ingredients": {
                    "bacon": 2,
                    "cheese": 0,
                    "meat": 0,
                    "salad": 0
                },
                "orderData": {
                    "country": "United States",
                    "deliveryMethod": "fastest",
                    "email": "reymillenium@gmail.com",
                    "name": "Reinier Garcia",
                    "street": "101 SW 36th CT APT 807",
                    "zipCode": "33135"
                },
                "price": "5.40",
                "userId": "yH5Ib18dsRXquneMgwQZJObUL0E2",
                "id": "-MP8ba97OLYOGyAATsrz"
            },
            {
                "ingredients": {
                    "bacon": 0,
                    "cheese": 0,
                    "meat": 0,
                    "salad": 3
                },
                "orderData": {
                    "country": "United States",
                    "deliveryMethod": "fastest",
                    "email": "reymillenium@gmail.com",
                    "name": "Reinier Garcia",
                    "street": "101 SW 36th CT APT 807",
                    "zipCode": "33135"
                },
                "price": "5.50",
                "userId": "yH5Ib18dsRXquneMgwQZJObUL0E2",
                "id": "-MP7pumw2JkMtTPLqVx8"
            },
            {
                "ingredients": {
                    "bacon": 0,
                    "cheese": 0,
                    "meat": 0,
                    "salad": 2
                },
                "orderData": {
                    "country": "United States",
                    "deliveryMethod": "fastest",
                    "email": "reymillenium@gmail.com",
                    "name": "Reinier Garcia",
                    "street": "101 SW 36th CT APT 807",
                    "zipCode": "33135"
                },
                "price": "5.00",
                "userId": "yH5Ib18dsRXquneMgwQZJObUL0E2",
                "id": "-MQeGIUm4DRzKmTrp0_i"
            }
        ]

        const afterFetchOrdersSuccessState = {
            orders: orders,
            loading: false,
            purchased: false,
            errors: null
        };

        // Is not storing the error currently (change it?)
        expect(OrderFormReducer(initialState, {
            type: actionTypes.FETCH_ORDERS_SUCCESS,
            payload: {
                orders: orders
            }
        })).toEqual(afterFetchOrdersSuccessState);
    });

    it('should set loading in false when there is an error fetching the orders', () => {
        const afterFetchOrdersFailState = {
            orders: [],
            loading: false,
            purchased: false,
            errors: null
        };

        // Is not storing the error currently (change it?)
        expect(OrderFormReducer(initialState, {
            type: actionTypes.FETCH_ORDERS_FAIL,
            payload: {
                error: 'some-error'
            }
        })).toEqual(afterFetchOrdersFailState);
    });

});