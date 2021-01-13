// put is a function. It will dispatch a new action
// delay: It delays the execution of the next step:
import {put, delay, call} from 'redux-saga/effects';
import axios from 'axios';

// import * as actionTypes from "../actions/actionTypes";
import * as actionCreators from "./../actions/index";

// The * symbol turns the function into a generator (Next gen JavaScript features)
// Function that can be executed incrementally. Yo can call them and they dont't start from start to end immediately,
// but you can pause during function execution (for example: to wait for asynchronous code to finish)

export function* logOutSaga(action) {
    // yield means that the step will be executed and then it will wait for it to finish
    // In an asynchronous action it wouldn't continue before the step is done (the same here, on a synchronous action)
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationDate');
    // yield localStorage.removeItem('localId');

    // This makes my generators testable:
    yield call([localStorage, "removeItem"], 'token');
    yield call([localStorage, "removeItem"], 'expirationDate');
    yield call([localStorage, "removeItem"], 'localId');


    // Hard-coding
    // yield put({
    //     type: actionTypes.AUTH_LOG_OUT
    // });
    yield put(actionCreators.logOutSucceed());
}

export function* checkAuthTimeOutSaga(action) {
    yield delay(action.payload.expirationTime * 1000);
    yield put(actionCreators.logOut());
}

export function* authUserSaga(action) {
    const apiKey = process.env.REACT_APP_API_KEY;
    // const signInWithCustomTokenEndPoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`;
    const signUpWithEmailAndPasswordEndPoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    const signInWithEmailAndPasswordEndPoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    let endPointURL = action.payload.isSignUp ? signUpWithEmailAndPasswordEndPoint : signInWithEmailAndPasswordEndPoint;

    yield put(actionCreators.authStart());

    const authData = {
        email: action.payload.email,
        password: action.payload.password,
        returnSecureToken: true
    }

    try {
        const response = yield axios.post(endPointURL, authData);

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate.toString());
        yield localStorage.setItem('localId', response.data.localId);

        yield put(actionCreators.authSuccess(response.data.idToken, response.data.localId));
        yield put(actionCreators.checkAuthTimeOut(response.data.expiresIn));

    } catch (error) {
        //  The received error is an object from axios (that wraps the response), but we need the error from Firebase:
        yield put(actionCreators.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) { // There is no token
        yield put(actionCreators.logOut());
    } else { // The token exists, but lets check the expiration date...
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate >= new Date()) { // All good yet
            const localId = yield localStorage.getItem('localId');
            yield put(actionCreators.authSuccess(token, localId));
            const expiresIn = yield Math.abs(expirationDate - new Date()) / 1000;
            yield put(actionCreators.checkAuthTimeOut(expiresIn));
        } else { // Our token has expired
            yield put(actionCreators.logOut());
        }
    }
}