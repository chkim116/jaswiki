import { useFormInput } from "@cooksmelon/event";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePush } from "../../hook";
import { RootState } from "../../redux";
import { registerRequest } from "../../redux/auth";
import { loadRequest } from "../../redux/commonLoading";
import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
const RegisterForm = dynamic(
    () => import("../../components/register/RegisterForm")
);

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

    const data = {
        title: "회원가입",
        url: "register",
        desc: "자스위키 회원가입",
    };

    return (
        <>
            <Seo data={data} />
            <RegisterForm
                onFormChange={onFormChange}
                onSubmit={onSubmit}
            ></RegisterForm>
        </>
    );
};

export default register;
