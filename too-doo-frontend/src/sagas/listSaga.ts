import { CustomAction } from "../models/common";
import { takeLatest, put, call } from 'redux-saga/effects';
import { ADD_NEW_LIST_FAILURE, ADD_NEW_LIST_REQUEST, ADD_NEW_LIST_SUCCESS, DELETE_LIST_FAILURE, DELETE_LIST_REQUEST, DELETE_LIST_SUCCESS, EDIT_LIST_FAILURE, EDIT_LIST_REQUEST, EDIT_LIST_SUCCESS, LOAD_LISTS_FROM_USER_FAILURE, LOAD_LISTS_FROM_USER_REQUEST, LOAD_LISTS_FROM_USER_SUCCESS, requestLoadListsFromUser } from "../actions/listActions";
import { SHOW_ERROR_TOAST, startAction, stopAction } from "../actions/uiActions";
import { addItemInAList, addItemsToList, addNewList, deleteList, getListsFromUser, patchAList } from "../services/BackendService";
import { AxiosResponse } from "axios";

function* handleLoadListsFromUser(action: CustomAction) {
    try {
        yield put(startAction(action.type));
        const response: AxiosResponse<any> = yield call(getListsFromUser, action.userId);
        yield put({ type: LOAD_LISTS_FROM_USER_SUCCESS, payload: response.data });
    } catch (e:any) {
        console.error(e);
        yield put({ type: LOAD_LISTS_FROM_USER_FAILURE });
        yield put({ type: SHOW_ERROR_TOAST, message: e.message });
    } finally {
        yield put(stopAction(action.type));
    }
}

function* handleAddNewList(action: CustomAction) {
    try {
        yield put(startAction(action.type));
        const response : AxiosResponse<any> = yield call(addNewList, action.userId, action.values.listName);
        yield call(addItemsToList, response.data.uuid, action.items);        
        yield put({ type: ADD_NEW_LIST_SUCCESS });
    } catch (e:any) {
        console.error(e);
        yield put({ type: ADD_NEW_LIST_FAILURE });
        yield put({ type: SHOW_ERROR_TOAST, message: e.message });
    } finally {
        yield put(stopAction(action.type));
    }
}

function* handleEditList(action: CustomAction) {
    try {
        yield put(startAction(action.type));
        yield call(patchAList, action.values.listId, action.values.listName);
        yield call(addItemsToList, action.values.listId, action.items);        
        yield put({ type: EDIT_LIST_SUCCESS });
    } catch (e:any) {
        console.error(e);
        yield put({ type: EDIT_LIST_FAILURE });
        yield put({ type: SHOW_ERROR_TOAST, message: e.message });
    } finally {
        yield put(stopAction(action.type));
    }
}


function* handleDeleteList(action: CustomAction) {
    try {
        yield put(startAction(action.type));
        yield call(deleteList, action.listId);
        yield put({ type: DELETE_LIST_SUCCESS });
    } catch (e:any) {
        console.error(e);
        yield put({ type: DELETE_LIST_FAILURE });
        yield put({ type: SHOW_ERROR_TOAST, message: e.message });
    } finally {
        yield put(stopAction(action.type));
    }
}
function* listSaga() {
    yield takeLatest(LOAD_LISTS_FROM_USER_REQUEST, handleLoadListsFromUser);
    yield takeLatest(ADD_NEW_LIST_REQUEST, handleAddNewList)
    yield takeLatest(EDIT_LIST_REQUEST, handleEditList)
    yield takeLatest(DELETE_LIST_REQUEST, handleDeleteList)
}


export default listSaga;


