import React from "react";
import { SignContainer } from "../register/RegisterForm";
import Link from "next/link";
import { Form } from "../register/RegisterForm";
import { Button } from "antd";

export type SignProps = {
    onFormChange: (e: React.FormEvent<HTMLFormElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onKaKaoLogin: () => void;
};

const LoginForm = ({ onFormChange, onSubmit, onKaKaoLogin }: SignProps) => {
    return (
        <SignContainer>
            <Button type="primary" onClick={onKaKaoLogin}>
                카카오
            </Button>
            <h1>로그인</h1>
            <Form onChange={onFormChange} onSubmit={onSubmit}>
                <input type="text" name="userId" placeholder="아이디 입력" />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호 입력"
                />
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
