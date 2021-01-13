import {takeEvery, all, takeLatest} from 'redux-saga/effects';
import * as actionTypes from './../actions/actionTypes';

import {
    logOutSaga,
    checkAuthTimeOutSaga,
    authUserSaga,
    authCheckStateSaga
} from './authSagas';

import {
    fetchInitialIngredientsSaga
} from './burgerBuilderSagas';

import {
    purchaseBurgerSaga,
    fetchOrdersSaga
} from './orderFormSagas';

export function* watchAuth(action) {
    // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logOutSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_TIME_OUT, checkAuthTimeOutSaga);
    // yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);

    // Another way of setting up the listeners, using the helper method 'all' this time:
    // They are are executed simultaneously (multiple tasks at the same time)
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logOutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIME_OUT, checkAuthTimeOutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder(action) {
    yield takeEvery(actionTypes.FETCH_INITIAL_INGREDIENTS, fetchInitialIngredientsSaga);
}

export function* watchOrderForm(action) {
    // yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    // takeLatest will automatically cancel any ongoing execution of purchaseBurgerSaga and always...
    // only executes the latest one (is useful from time to time to make sure that only of these...
    // processes here is going on at a time)
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);

    // With takeEvery it will execute fetchOrdersSaga whenever this action type (FETCH_ORDERS) is detected.
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}