import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from './../actions/actionTypes';

import {logOutSaga} from './authSagas';

export function* watchAuth(action) {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logOutSaga);
}