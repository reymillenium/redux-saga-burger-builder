import {put} from 'redux-saga/effects';
// import axios from 'axios';
import axios from '../../axios-orders';
import * as actionCreators from "./../actions/index";

export function* purchaseBurgerSaga(action) {
    yield put(actionCreators.purchaseBurgerStart());

    try {
        const response = yield axios.post('/orders.json?auth=' + action.payload.token, action.payload.order);
        yield put(actionCreators.purchaseBurgerSuccess(response.data.name, action.payload.order));
    } catch (error) {
        yield put(actionCreators.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actionCreators.fetchOrdersStart());
    const queryParams = yield `?auth=${action.payload.token}&orderBy="userId"&equalTo="${action.payload.userId}"`;

    try {
        const response = yield axios.get('/orders.json' + queryParams)
        const fetchedOrders = [];
        // Transforms the orders into an array format
        for (let key in response.data) {
            fetchedOrders.push({
                // Gets all the fields in the js object and then adds a new one (id)
                ...response.data[key],
                id: key
            });
        }

        yield put(actionCreators.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actionCreators.fetchOrdersFail(error));
    }
}