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
        _id: "",
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
            _id: "",
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
        getDocById: (state, { payload }) => {
            state.isLoading = false;
            state.isDone = true;
            state.doc = payload;
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
    getDocById,
    getDocsRequest,
    getDocsSuccess,
    getDocsFailure,
    delDocsRequest,
    delDocsSuccess,
    delDocsFailure,
} = docs.actions;

export default docs.reducer;
