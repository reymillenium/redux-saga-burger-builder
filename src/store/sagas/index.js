import {takeEvery} from 'redux-saga/effects';
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

export function* watchAuth(action) {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logOutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIME_OUT, checkAuthTimeOutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder(action) {
    yield takeEvery(actionTypes.FETCH_INITIAL_INGREDIENTS, fetchInitialIngredientsSaga);
}