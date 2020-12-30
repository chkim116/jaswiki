import { useFormInput } from "@cooksmelon/event";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePush } from "../../hook";
import { RootState } from "../../redux";
import { loginRequest } from "../../redux/auth";
import { loadRequest } from "../../redux/commonLoading";
import dynamic from "next/dynamic";
const LoginForm = dynamic(() => import("../../components/login/LoginForm"));

const login = () => {
    const [form, onFormChange] = useFormInput();
    const dispatch = useDispatch();
    const { isLogin } = useSelector((state: RootState) => state.auth);
    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(loadRequest());
            dispatch(loginRequest(form));
        },
        [form, dispatch]
    );

    usePush(isLogin, "/");

    return (
        <LoginForm onFormChange={onFormChange} onSubmit={onSubmit}></LoginForm>
    );
};

export default login;
