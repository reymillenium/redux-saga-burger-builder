import {takeEvery, all} from 'redux-saga/effects';
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
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}