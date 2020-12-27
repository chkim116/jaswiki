import { useFormInput } from "@cooksmelon/event";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../../components/register/RegisterForm";
import { usePush } from "../../hook";
import { RootState } from "../../redux";
import { registerRequest } from "../../redux/auth";
import { loadRequest } from "../../redux/commonLoading";

const register = () => {
    const [form, onFormChange] = useFormInput();
    const dispatch = useDispatch();
    const { isLogin, isRegisterErr } = useSelector(
        (state: RootState) => state.auth
    );

    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(loadRequest());
            dispatch(registerRequest(form));
        },

        [form, dispatch, isRegisterErr]
    );

    usePush(isLogin, "/");

    return (
        <RegisterForm
            onFormChange={onFormChange}
            onSubmit={onSubmit}></RegisterForm>
    );
};

export default register;
