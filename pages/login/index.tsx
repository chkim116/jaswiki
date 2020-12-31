import { useFormInput } from "@cooksmelon/event";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePush } from "../../hook";
import { RootState } from "../../redux";
import { loginRequest } from "../../redux/auth";
import { loadRequest } from "../../redux/commonLoading";
import dynamic from "next/dynamic";
import axios from "axios";
import Seo from "../../components/common/Seo";
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

    const onKaKaoLogin = useCallback(() => {
        const kakako = async () => await axios.get("/user/kakao");
        kakako();
    }, []);

    usePush(isLogin, "/");

    const data = {
        title: "로그인",
        url: "login",
        desc: "자스위키 로그인하기",
    };

    return (
        <>
            <Seo data={data} />
            <LoginForm
                onFormChange={onFormChange}
                onKaKaoLogin={onKaKaoLogin}
                onSubmit={onSubmit}></LoginForm>
        </>
    );
};

export default login;
