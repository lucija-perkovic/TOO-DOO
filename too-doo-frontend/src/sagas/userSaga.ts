import { CustomAction } from "../models/common";
import { takeLatest, put, call } from 'redux-saga/effects';
import { SHOW_ERROR_TOAST, startAction, stopAction } from "../actions/uiActions";
import { login } from "../services/BackendService";
import { AxiosResponse } from "axios";
import { List } from "../models/list";
import { LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS } from "../actions/userActions";

function* loginUser(action: CustomAction) {
    try {
        yield put(startAction(action.type));
        const data: AxiosResponse<List[]> = yield call(login, action.values);
        yield put({ type: LOGIN_USER_SUCCESS, payload: data });
    } catch (e:any) {
        console.error(e);
        yield put({ type: LOGIN_USER_FAILURE });
        yield put({ type: SHOW_ERROR_TOAST, message: e.message });
    } finally {
        yield put(stopAction(action.type));
    }
}

function* userSaga() {
    yield takeLatest(LOGIN_USER_REQUEST, loginUser);
}


export default userSaga;