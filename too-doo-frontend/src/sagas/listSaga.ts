import { CustomAction } from "../models/common";
import { takeLatest, put, call } from 'redux-saga/effects';
import { ADD_ITEM_TO_LIST_FAILURE, ADD_ITEM_TO_LIST_REQUEST, ADD_ITEM_TO_LIST_SUCCESS, ADD_NEW_LIST_FAILURE, ADD_NEW_LIST_REQUEST, ADD_NEW_LIST_SUCESS, LOAD_LISTS_FROM_USER_FAILURE, LOAD_LISTS_FROM_USER_REQUEST, LOAD_LISTS_FROM_USER_SUCCESS } from "../actions/listActions";
import { SHOW_ERROR_TOAST, startAction, stopAction } from "../actions/uiActions";
import { addItemInAList, addNewList, getListsFromUser } from "../services/BackendService";
import { AxiosResponse } from "axios";

function* handleLoadListsFromUser(action: CustomAction) {
    try {
        yield put(startAction(action.type));
        const response: AxiosResponse<any> = yield call(getListsFromUser, action.userId);
        console.log("DATA",response.data)
        yield put({ type: LOAD_LISTS_FROM_USER_SUCCESS, payload: response.data });
    } catch (e:any) {
        console.error(e);
        yield put({ type: LOAD_LISTS_FROM_USER_FAILURE });
        yield put({ type: SHOW_ERROR_TOAST, message: e.message });
    } finally {
        yield put(stopAction(action.type));
    }
}

function* handleAddItemToList(action: CustomAction) {
    try {
        yield put(startAction(action.type));
        yield call(addItemInAList, action.name, action.listId, action.isComplete);
        yield put({ type: ADD_ITEM_TO_LIST_SUCCESS });
    } catch (e:any) {
        console.error(e);
        yield put({ type: ADD_ITEM_TO_LIST_FAILURE });
        yield put({ type: SHOW_ERROR_TOAST, message: e.message });
    } finally {
        yield put(stopAction(action.type));
    }
}


function* handleAddNewList(action: CustomAction) {
    try {
        yield put(startAction(action.type));
        yield call(addNewList, action.userId);
        yield put({ type: ADD_NEW_LIST_SUCESS });
    } catch (e:any) {
        console.error(e);
        yield put({ type: ADD_NEW_LIST_FAILURE });
        yield put({ type: SHOW_ERROR_TOAST, message: e.message });
    } finally {
        yield put(stopAction(action.type));
    }
}


function* listSaga() {
    yield takeLatest(LOAD_LISTS_FROM_USER_REQUEST, handleLoadListsFromUser);
    yield takeLatest(ADD_ITEM_TO_LIST_REQUEST, handleAddItemToList)
    yield takeLatest(ADD_NEW_LIST_REQUEST, handleAddNewList)
}


export default listSaga;

