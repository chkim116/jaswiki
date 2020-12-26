import { useFormInput } from "@cooksmelon/event";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/login/LoginForm";
import { usePush } from "../../hook";
import { RootState } from "../../redux";
import { loginRequest } from "../../redux/auth";

const login = () => {
    const [form, onFormChange] = useFormInput();
    const dispatch = useDispatch();
    const { isLogin } = useSelector((state: RootState) => state.auth);
    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(loginRequest(form));
        },
        [form]
    );

    usePush(isLogin, "/");

    return (
        <LoginForm onFormChange={onFormChange} onSubmit={onSubmit}></LoginForm>
    );
};

export default login;
