import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Btn, SignProps } from "../login/LoginForm";

export const SignContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 40px auto;
    text-align: center;
    h1 {
        padding: 60px 0;
        font-weight: 600;
    }

    a {
        color: ${(props) => props.theme.link};
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    input {
        width: 300px;
        padding: 12px;
        height: 50px;
        margin: 8px 0;
        outline: none;
        border: none;
        border-bottom: 2px solid ${(props) => props.theme.darkWhite};

        &:focus {
            transition: all 800ms;
            border-bottom: 2px solid ${(props) => props.theme.blue};
        }
    }

    button {
        width: 150px;
        padding: 8px;
        background: ${(props) => props.theme.green};
        color: ${(props) => props.theme.white};
        margin: 10px auto;
    }
`;

const RegisterForm = ({ onFormChange, onSubmit }: SignProps) => {
    return (
        <SignContainer>
            <div>
                <h1>
                    회원가입을 하면🤝 <br />
                    기여도도 측정하고🎤 <br />
                    문서를 작성하는 등 다양한 혜택을 누릴 수 있습니다😄
                </h1>
            </div>
            <Form onChange={onFormChange} onSubmit={onSubmit}>
                <input
                    type="text"
                    name="userId"
                    placeholder="아이디 *"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호 *"
                    required
                />
                <input type="email" name="email" placeholder="이메일" />
                <button type="submit">Done!</button>
            </Form>
            <Btn>
                <Link href="/login">
                    <a>Login-{">"}</a>
                </Link>
            </Btn>
        </SignContainer>
    );
};

export default RegisterForm;
