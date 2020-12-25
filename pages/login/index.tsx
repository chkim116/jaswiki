import { useFormInput } from "@cooksmelon/event";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../../components/login/LoginForm";
import { loginRequest } from "../../redux/auth";

const login = () => {
    const [form, onFormChange] = useFormInput();
    const dispatch = useDispatch();

    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(loginRequest(form));
        },
        [form]
    );

    return (
        <LoginForm onFormChange={onFormChange} onSubmit={onSubmit}></LoginForm>
    );
};

export default login;
