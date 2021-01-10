import {put} from 'redux-saga/effects';
// import axios from 'axios';
import axios from "../../axios-orders";
import * as actionCreators from "./../actions/index";

export function* fetchInitialIngredientsSaga(action) {
    try {
        const response = yield axios.get('https://udemy-reactjs-burger-bui-82d48.firebaseio.com/ingredients.json')
        yield put(actionCreators.setIngredients(response.data));
    } catch (error) {
        yield put(actionCreators.fetchIngredientsFailed());
    }
}