import { createSlice } from "@reduxjs/toolkit";

type LoadingState = {
    isCommonLoading: boolean;
};

const loadingState: LoadingState = {
    isCommonLoading: false,
};

const commonLoading = createSlice({
    name: "commonLoading",
    initialState: loadingState,
    reducers: {
        loadRequest: (state) => {
            state.isCommonLoading = true;
        },
        loadSuccess: (state) => {
            state.isCommonLoading = false;
        },
        loadFailure: (state) => {
            state.isCommonLoading = false;
        },
    },
});

export const { loadRequest, loadSuccess, loadFailure } = commonLoading.actions;

export default commonLoading.reducer;
