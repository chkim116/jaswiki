import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    getAuthRequest,
    getAuthSuccess,
    getAuthFailure,
} from "../redux/auth";
import Axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { SignPayload } from "../@types/type";

function login(data: SignPayload) {
    return Axios.post("/user", data).then((res) => res.data);
}

function register(data: SignPayload) {
    return Axios.post("/user/register", data).then((res) => res.data);
}

function auth() {
    return Axios.get("/user/auth").then((res) => res.data);
}

function* postLogin({ payload }: PayloadAction<SignPayload>) {
    const user = yield call(login, payload);
    try {
        yield put(loginSuccess());
        yield put(getAuthSuccess(user));
    } catch (err) {
        console.error(err);
        yield put(loginFailure(err));
    }
}
function* postRegister({ payload }: PayloadAction<SignPayload>) {
    const user = yield call(register, payload);
    try {
        yield put(registerSuccess());
        yield put(getAuthSuccess(user));
    } catch (err) {
        console.error(err);
        yield put(registerFailure(err));
    }
}
function* getAuth() {
    const user = yield call(auth);
    try {
        yield put(getAuthSuccess(user));
    } catch (err) {
        console.error(err);
        yield put(getAuthFailure(err));
    }
}

function* watchLogin() {
    yield takeLatest(loginRequest, postLogin);
}

function* watchRegister() {
    yield takeLatest(registerRequest, postRegister);
}

function* watchAuth() {
    yield takeLatest(getAuthRequest, getAuth);
}

export default function* authSaga() {
    yield all([fork(watchLogin), fork(watchRegister), fork(watchAuth)]);
}
