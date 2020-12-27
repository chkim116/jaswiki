import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
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

function getDoc() {
    return Axios.get("/docs").then((res) => res.data);
}

function delDoc(id: string) {
    return Axios.delete(`/docs/del/${id}`);
}

function* getDocs() {
    try {
        const docs = yield call(getDoc);
        console.log(docs);
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

function* watchGetDocs() {
    yield takeLatest(getDocsRequest, getDocs);
}

function* watchDelDocs() {
    yield takeLatest(delDocsRequest, delDocs);
}

export default function* authSaga() {
    yield all([fork(watchGetDocs), fork(watchDelDocs)]);
}
