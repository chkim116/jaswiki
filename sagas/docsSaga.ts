import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
    getDocByIdRequest,
    getDocByIdSuccess,
    getDocByIdFailure,
    getDocsRequest,
    getDocsSuccess,
    getDocsFailure,
    delDocsRequest,
    delDocsSuccess,
    delDocsFailure,
} from "../redux/docs";
import Axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { loadFailure } from "../redux/commonLoading";

function getDocById(id: string) {
    return Axios.get(`/docs/${id}`).then((res) => res.data);
}

function getDoc() {
    return Axios.get("/docs").then((res) => res.data);
}

function delDoc(id: string) {
    return Axios.delete(`/docs/del/${id}`);
}

function* getById({ payload }: PayloadAction<string>) {
    try {
        const docById = yield call(getDocById, payload);
        yield put(getDocByIdSuccess(docById));
    } catch (err) {
        console.error(err);
        yield put(getDocByIdFailure(err));
    }
}

function* getDocs() {
    try {
        const docs = yield call(getDoc);
        yield put(getDocsSuccess(docs));
    } catch (err) {
        console.error(err);
        yield put(getDocsFailure(err));
    }
}

function* delDocs({ payload }: PayloadAction<string>) {
    try {
        yield call(delDoc, payload);
        yield put(delDocsSuccess());
    } catch (err) {
        console.error(err);
        yield put(delDocsFailure(err));
        yield put(loadFailure());
    }
}

function* watchGetById() {
    yield takeLatest(getDocByIdRequest, getById);
}

function* watchGetDocs() {
    yield takeLatest(getDocsRequest, getDocs);
}

function* watchDelDocs() {
    yield takeLatest(delDocsRequest, delDocs);
}

export default function* authSaga() {
    yield all([fork(watchGetById), fork(watchGetDocs), fork(watchDelDocs)]);
}
