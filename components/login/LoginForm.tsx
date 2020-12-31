import React from "react";
import { SignContainer, Form, KakaoBtn } from "../register/RegisterForm";
import Link from "next/link";
import styled from "@emotion/styled";

export const Btn = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    width: 150px;

    a,
    button {
        margin-bottom: 12px;
        color: #333;
        font-size: ${(props) => props.theme.ss};
        border: 1px solid ${(props) => props.theme.darkWhite};
        padding: 3px 8px;
        text-decoration: none;
        transition: none;
        &:hover {
            background: ${(props) => props.theme.blue};
            color: ${(props) => props.theme.white};
        }
    }
`;

export type SignProps = {
    onFormChange: (e: React.FormEvent<HTMLFormElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onKaKaoLogin?: () => void;
};

const LoginForm = ({ onFormChange, onSubmit, onKaKaoLogin }: SignProps) => {
    return (
        <SignContainer>
            <h1>로그인</h1>
            <Form onChange={onFormChange} onSubmit={onSubmit}>
                <input type="text" name="userId" placeholder="아이디 입력" />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호 입력"
                />
                <button type="submit">Login</button>
            </Form>
            <KakaoBtn type="button" onClick={onKaKaoLogin}>
                KaKaoLogin
            </KakaoBtn>
            <Btn>
                <Link href="/register">
                    <a>Register-{">"}</a>
                </Link>
                <Link href="/">
                    <button type="button">Main</button>
                </Link>
            </Btn>
        </SignContainer>
    );
};

export default LoginForm;
