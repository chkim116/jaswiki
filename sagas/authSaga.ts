import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
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
import { loadFailure, loadSuccess } from "../redux/commonLoading";
import { alertErr } from "../lib";

function login(data: SignPayload) {
    return Axios.post("/user", data).then((res) => res.data);
}

function logout() {
    return Axios.get("/user/logout").then((res) => res.data);
}

function register(data: SignPayload) {
    return Axios.post("/user/register", data).then((res) => res.data);
}

function auth() {
    return Axios.get("/user/auth").then((res) => res.data);
}

function* postLogin({ payload }: PayloadAction<SignPayload>) {
    try {
        const user = yield call(login, payload);
        yield put(loadSuccess());
        yield put(getAuthSuccess(user));
    } catch (err) {
        console.error(err);
        yield put(loadFailure());
        yield put(loginFailure(err.message));
        yield alertErr("아이디와 비밀번호를 다시 확인해 주세요.");
    }
}

function* postLogout() {
    try {
        yield call(logout);
        yield put(logoutSuccess());
    } catch (err) {
        console.error(err);
        yield put(logoutFailure(err.message));
        yield alertErr("로그아웃 실패");
    }
}

function* postRegister({ payload }: PayloadAction<SignPayload>) {
    try {
        const user = yield call(register, payload);
        yield put(registerSuccess());
        yield put(getAuthSuccess(user));
    } catch (err) {
        console.error(err);
        yield put(registerFailure(err.message));
        yield alertErr("회원가입에 실패하였습니다. 다시 확인해 주세요");
        yield put(loadFailure());
    }
}
function* getAuth() {
    try {
        const user = yield call(auth);
        yield put(getAuthSuccess(user));
    } catch (err) {
        console.error(err);
        yield put(getAuthFailure("유저 정보 X"));
    }
}

function* watchLogin() {
    yield takeLatest(loginRequest, postLogin);
}

function* watchLogout() {
    yield takeLatest(logoutRequest, postLogout);
}

function* watchRegister() {
    yield takeLatest(registerRequest, postRegister);
}

function* watchAuth() {
    yield takeLatest(getAuthRequest, getAuth);
}

export default function* authSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchRegister),
        fork(watchAuth),
    ]);
}
