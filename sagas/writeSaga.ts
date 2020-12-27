import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
    WriteRequest,
    WriteSuccess,
    WriteFailure,
    updateRequest,
    updateSuccess,
} from "../redux/write";
import Axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { WritePayload } from "../@types/type";
import { loadFailure } from "../redux/commonLoading";

function writeDocument(data: WritePayload) {
    return Axios.post("/docs/post", data).then((res) => res.data);
}

function updateDocument(data: WritePayload) {
    return Axios.put(`/docs/put/${data.id}`, data);
}

function* postWrite({ payload }: PayloadAction<WritePayload>) {
    try {
        const router = yield call(writeDocument, payload);
        yield put(WriteSuccess(router));
    } catch (err) {
        console.error(err);
        yield put(WriteFailure(err));
        yield put(loadFailure());
    }
}

function* postUpdate({ payload }: PayloadAction<WritePayload>) {
    try {
        yield call(updateDocument, payload);
        yield put(updateSuccess());
    } catch (err) {
        console.error(err);
        yield put(WriteFailure(err));
        yield put(loadFailure());
    }
}

function* watchPostWrite() {
    yield takeLatest(WriteRequest, postWrite);
}

function* watchPostUpdate() {
    yield takeLatest(updateRequest, postUpdate);
}

export default function* authSaga() {
    yield all([fork(watchPostWrite), fork(watchPostUpdate)]);
}
