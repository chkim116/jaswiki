import { createSlice } from "@reduxjs/toolkit";
import { docs } from "../@types/type";

type WriteState = {
    isLoading: boolean;
    isDone: boolean;
    isErr: string | null;
    doc: docs;
    docs: docs[];
};

const writeState: WriteState = {
    isLoading: false,
    isDone: false,
    isErr: null,
    doc: {
        id: "",
        title: "",
        description: "",
        content: "",
        createDate: "",
        recentDate: "",
        stack: [0],
        creator: { userId: "", level: 0 },
        recentCreator: { userId: "", level: 0 },
        contributer: [""],
    },
    docs: [
        {
            id: "",
            title: "",
            description: "",
            content: "",
            createDate: "",
            recentDate: "",
            stack: [],
            creator: { userId: "", level: 0 },
            recentCreator: { userId: "", level: 0 },
            contributer: [],
        },
    ],
};

const write = createSlice({
    name: "write",
    initialState: writeState,
    reducers: {
        getDocByIdRequest: (state, { payload }) => {
            state.isDone = false;
            state.isLoading = false;
            state.isErr = null;
        },
        getDocByIdSuccess: (state, { payload }) => {
            state.isLoading = true;
            state.isDone = true;
            state.doc = payload;
        },
        getDocByIdFailure: (state, { payload }) => {
            state.isDone = false;
            state.isLoading = false;
            state.isErr = payload;
        },

        getDocsRequest: (state, { payload }) => {
            state.isDone = false;
            state.isLoading = false;
            state.isErr = null;
        },
        getDocsSuccess: (state, { payload }) => {
            state.isLoading = true;
            state.isDone = true;
            state.docs = payload;
        },
        getDocsFailure: (state, { payload }) => {
            state.isDone = false;
            state.isLoading = false;
            state.isErr = payload;
        },
    },
});

export const {
    getDocByIdRequest,
    getDocByIdSuccess,
    getDocByIdFailure,
    getDocsRequest,
    getDocsSuccess,
    getDocsFailure,
} = write.actions;

export default write.reducer;
