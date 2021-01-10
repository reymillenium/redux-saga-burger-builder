import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actionCreators from "./../actions/index";

export function* fetchInitialIngredientsSaga(action) {
    const response = yield axios.get('https://udemy-reactjs-burger-bui-82d48.firebaseio.com/ingredients.json')

    try {
        yield put(actionCreators.setIngredients(response.data));
    } catch (error) {
        yield put(actionCreators.fetchIngredientsFailed());
    }
}