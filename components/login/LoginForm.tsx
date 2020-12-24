import React from "react";
import styled from "@emotion/styled";
import { SignContainer } from "../register/RegisterForm";
import Link from "next/link";
import { Form } from "../register/RegisterForm";

const LoginForm = () => {
    return (
        <SignContainer>
            <h1>로그인</h1>
            <Form>
                <input type="text" placeholder="아이디 입력" />
                <input type="password" placeholder="비밀번호 입력" />
                <button type="submit">로그인</button>
            </Form>
            <Link href="/register">
                <a>회원가입하기</a>
            </Link>
            <Link href="/">
                <button type="button">메인으로</button>
            </Link>
        </SignContainer>
    );
};

export default LoginForm;
