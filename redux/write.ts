import { createSlice } from "@reduxjs/toolkit";

type WriteState = {
    isLoading: boolean;
    isDone: boolean;
    isErr: string | null;
    isEdit: false;
    detailRouter: string;
};

const writeState: WriteState = {
    isLoading: false,
    isDone: false,
    isErr: null,
    isEdit: false,
    detailRouter: "",
};

const write = createSlice({
    name: "write",
    initialState: writeState,
    reducers: {
        WriteRequest: (state, { payload }) => {
            state.isDone = false;
            state.isLoading = true;
            state.isErr = null;
        },
        WriteSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.isDone = true;
            state.detailRouter = payload;
        },
        WriteFailure: (state, { payload }) => {
            state.isDone = false;
            state.isLoading = false;
            state.isErr = payload;
        },
        updateRequest: (state, { payload }) => {
            state.isDone = false;
            state.isLoading = true;
            state.isErr = null;
        },
        updateSuccess: (state) => {
            state.isLoading = false;
            state.isDone = true;
        },
        updateFailure: (state, { payload }) => {
            state.isDone = false;
            state.isLoading = false;
            state.isErr = payload;
        },
    },
});

export const {
    WriteRequest,
    WriteSuccess,
    WriteFailure,
    updateRequest,
    updateSuccess,
    updateFailure,
} = write.actions;

export default write.reducer;
