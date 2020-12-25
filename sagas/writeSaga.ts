import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
    getDocByIdRequest,
    getDocByIdSuccess,
    getDocByIdFailure,
    getDocsRequest,
    getDocsSuccess,
    getDocsFailure,
} from "../redux/write";
import Axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { WritePayload } from "../@types/type";

function getDocById(data: WritePayload) {
    return Axios.post("/user", data).then((res) => res.data);
}

function getDoc(data: WritePayload) {
    return Axios.post("/user/register", data).then((res) => res.data);
}

function* getById({ payload }: PayloadAction<WritePayload>) {
    const docById = yield call(getDocById, payload);
    try {
        yield put(getDocByIdSuccess(docById));
    } catch (err) {
        console.error(err);
        yield put(getDocByIdFailure(err));
    }
}
function* getDocs({ payload }: PayloadAction<WritePayload>) {
    const docs = yield call(getDoc, payload);
    try {
        yield put(getDocsSuccess(docs));
    } catch (err) {
        console.error(err);
        yield put(getDocsFailure(err));
    }
}

function* watchGetById() {
    yield takeLatest(getDocByIdRequest, getById);
}

function* watchGetDocs() {
    yield takeLatest(getDocsRequest, getDocs);
}

export default function* authSaga() {
    yield all([fork(watchGetById), fork(watchGetDocs)]);
}
