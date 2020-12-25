import { useFormInput } from "@cooksmelon/event";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import RegisterForm from "../../components/register/RegisterForm";
import { registerRequest } from "../../redux/auth";

const register = () => {
    const [form, onFormChange] = useFormInput();
    const dispatch = useDispatch();

    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(registerRequest(form));
        },
        [form]
    );

    return (
        <RegisterForm
            onFormChange={onFormChange}
            onSubmit={onSubmit}></RegisterForm>
    );
};

export default register;
