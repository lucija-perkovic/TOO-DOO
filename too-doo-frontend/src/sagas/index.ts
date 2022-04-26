import { fork } from "redux-saga/effects";
import listSaga from "./listSaga";
import userSaga from "./userSaga";

function* rootSaga() {
    yield fork(listSaga),
    yield fork(userSaga)
}

export default rootSaga;