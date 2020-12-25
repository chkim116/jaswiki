import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
    getDocByIdRequest,
    getDocByIdSuccess,
    getDocByIdFailure,
    getDocsRequest,
    getDocsSuccess,
    getDocsFailure,
} from "../redux/docs";
import Axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

function getDocById(id: string) {
    return Axios.get(`/docs/${id}`).then((res) => res.data);
}

function getDoc() {
    return Axios.get("/docs").then((res) => res.data);
}

function* getById({ payload }: PayloadAction<string>) {
    const docById = yield call(getDocById, payload);
    try {
        yield put(getDocByIdSuccess(docById));
    } catch (err) {
        console.error(err);
        yield put(getDocByIdFailure(err));
    }
}
function* getDocs() {
    const docs = yield call(getDoc);
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
