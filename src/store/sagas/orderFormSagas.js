import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actionCreators from "./../actions/index";

export function* purchaseBurgerSaga(action) {
    yield put(actionCreators.purchaseBurgerStart());
    const response = yield axios.post('/orders.json?auth=' + action.payload.token, action.payload.order);

    try {
        yield put(actionCreators.purchaseBurgerSuccess(response.data.name, action.payload.order));
    } catch (error) {
        yield put(actionCreators.purchaseBurgerFail(error));
    }
}