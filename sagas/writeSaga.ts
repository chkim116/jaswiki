import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { WriteRequest, WriteSuccess, WriteFailure } from "../redux/write";
import Axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { WritePayload } from "../@types/type";
import { loadFailure } from "../redux/commonLoading";

function writeDocument(data: WritePayload) {
    return Axios.post("/docs/post", data).then((res) => res.data);
}

function* postWrite({ payload }: PayloadAction<WritePayload>) {
    const router = yield call(writeDocument, payload);
    try {
        yield put(WriteSuccess(router));
    } catch (err) {
        console.error(err);
        yield put(WriteFailure(err));
        yield put(loadFailure());
    }
}

function* watchPostWrite() {
    yield takeLatest(WriteRequest, postWrite);
}

export default function* authSaga() {
    yield all([fork(watchPostWrite)]);
}
