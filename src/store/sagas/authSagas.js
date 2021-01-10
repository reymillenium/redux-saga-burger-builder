// put is a function. It will dispatch a new action
import {put} from 'redux-saga/effects';

// import * as actionTypes from "../actions/actionTypes";
import * as actionCreators from "./../actions/index";

// The * symbol turns the function into a generator (Next gen JavaScript features)
// Function that can be executed incrementally. Yo can call them and they dont't start from start to end immediately,
// but you can pause during function execution (for example: to wait for asynchronous code to finish)

export function* logOutSaga(action) {
    // yield means that the step will be executed and then it will wait for it to finish
    // In an asynchronous action it wouldn't continue before the step is done (the same here, on a synchronous action)
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('localId');
    // Hard-coding
    // yield put({
    //     type: actionTypes.AUTH_LOG_OUT
    // });
    yield put(actionCreators.logOutSucceed());
}