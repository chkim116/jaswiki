import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import auth from "./auth";
import write from "./write";

const rootReducer = (state: any, action: any) => {
    switch (action.type) {
        case HYDRATE:
            return action.payload;
        default: {
            const combineReducer = combineReducers({
                auth,
                write,
            });
            return combineReducer(state, action);
        }
    }
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
