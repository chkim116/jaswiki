import { createSlice } from "@reduxjs/toolkit";
import { user } from "../@types/type";

type AuthState = {
    isLoading: boolean;
    isLogin: boolean;
    isLoginErr: string | null;
    isRegister: boolean;
    isRegisterErr: string | null;
    user: user;
};

const authState: AuthState = {
    isLoading: false,
    isLogin: false,
    isLoginErr: null,
    isRegister: false,
    isRegisterErr: null,
    user: {
        id: "",
        userId: "",
        level: 1,
        contribute: 0,
        email: "",
        docs: [],
    },
};

const auth = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        loginRequest: (state, { payload }) => {
            state.isLogin = false;
            state.isLoading = false;
            state.isLoginErr = null;
        },
        loginSuccess: (state) => {
            state.isLoading = true;
            state.isLogin = true;
        },
        loginFailure: (state, { payload }) => {
            state.isLogin = false;
            state.isLoading = false;
            state.isLoginErr = payload;
        },

        registerRequest: (state, { payload }) => {
            state.isLoading = false;
            state.isRegister = false;
            state.isRegisterErr = null;
        },
        registerSuccess: (state) => {
            state.isLoading = true;
            state.isRegister = true;
        },
        registerFailure: (state, { payload }) => {
            state.isLoading = false;
            state.isRegister = false;
            state.isRegisterErr = payload;
        },

        getAuthRequest: (state) => {
            state.isLoading = false;
            state.isLogin = false;
            state.isLoginErr = null;
        },
        getAuthSuccess: (state, { payload }) => {
            state.isLoading = true;
            state.user = payload;
        },
        getAuthFailure: (state, { payload }) => {
            state.isLoading = false;
            state.isLogin = false;
            state.isLoginErr = payload;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    getAuthRequest,
    getAuthSuccess,
    getAuthFailure,
} = auth.actions;

export default auth.reducer;
