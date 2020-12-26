import { createSlice } from "@reduxjs/toolkit";
import { doc } from "../@types/type";

type DocsState = {
    isLoading: boolean;
    isDone: boolean;
    isDel: boolean;
    isErr: string | null;
    doc: doc;
    docs: doc[];
};

const docsState: DocsState = {
    isLoading: false,
    isDone: false,
    isDel: false,
    isErr: null,
    doc: {
        id: "",
        title: "",
        description: "",
        content: "",
        createDate: "",
        recentUpdate: "",
        stack: [0],
        creator: { userId: "", level: 0, id: "" },
        recentCreator: { userId: "", level: 0, id: "" },
        contributer: [{ userId: "", level: 0, id: "" }],
    },
    docs: [
        {
            id: "",
            title: "",
            description: "",
            content: "",
            createDate: "",
            recentUpdate: "",
            stack: [],
            creator: { userId: "", level: 0, id: "" },
            recentCreator: { userId: "", level: 0, id: "" },
            contributer: [{ userId: "", level: 0, id: "" }],
        },
    ],
};

const docs = createSlice({
    name: "docs",
    initialState: docsState,
    reducers: {
        getDocByIdRequest: (state, { payload }) => {
            state.isDone = false;
            state.isLoading = true;
            state.isErr = null;
        },
        getDocByIdSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.isDone = true;
            state.doc = payload;
        },
        getDocByIdFailure: (state, { payload }) => {
            state.isDone = false;
            state.isLoading = false;
            state.isErr = payload;
        },

        getDocsRequest: (state) => {
            state.isDone = false;
            state.isLoading = true;
            state.isErr = null;
        },
        getDocsSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.isDone = true;
            state.docs = payload;
        },
        getDocsFailure: (state, { payload }) => {
            state.isDone = false;
            state.isLoading = false;
            state.isErr = payload;
        },

        delDocsRequest: (state, { payload }) => {
            state.isDel = false;
            state.isLoading = true;
            state.isErr = null;
        },
        delDocsSuccess: (state) => {
            state.isLoading = false;
            state.isDel = true;
        },
        delDocsFailure: (state, { payload }) => {
            state.isDel = false;
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
    delDocsRequest,
    delDocsSuccess,
    delDocsFailure,
} = docs.actions;

export default docs.reducer;
