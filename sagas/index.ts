import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import docsSaga from "./docsSaga";
import writeSaga from "./writeSaga";
import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:4000";
Axios.defaults.withCredentials = true;
export default function* rootSaga() {
    yield all([fork(authSaga), fork(docsSaga), fork(writeSaga)]);
}
