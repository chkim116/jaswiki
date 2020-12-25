import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import docsSaga from "./docsSaga";
import writeSaga from "./writeSaga";

export default function* rootSaga() {
    yield all([fork(authSaga), fork(docsSaga), fork(writeSaga)]);
}
