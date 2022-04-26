import { CustomAction } from "../models/common";
import { takeLatest, put, call } from 'redux-saga/effects';
import { LOAD_LISTS_FROM_USER_FAILURE, LOAD_LISTS_FROM_USER_REQUEST, LOAD_LISTS_FROM_USER_SUCCESS } from "../actions/listActions";
import { SHOW_ERROR_TOAST, startAction, stopAction } from "../actions/uiActions";
import { getListsFromUser } from "../services/BackendService";
import { AxiosResponse } from "axios";
import { List } from "../models/list";

function* handleLoadListsFromUser(action: CustomAction) {
    console.log("HANDLING")
    try {
        yield put(startAction(action.type));
        const data: AxiosResponse<List[]> = yield call(getListsFromUser, action.userId);
        yield put({ type: LOAD_LISTS_FROM_USER_SUCCESS, payload: data });
    } catch (e:any) {
        console.error(e);
        yield put({ type: LOAD_LISTS_FROM_USER_FAILURE });
        yield put({ type: SHOW_ERROR_TOAST, message: e.message });
    } finally {
        yield put(stopAction(action.type));
    }
}

function* listSaga() {
    yield takeLatest(LOAD_LISTS_FROM_USER_REQUEST, handleLoadListsFromUser);
}


export default listSaga;