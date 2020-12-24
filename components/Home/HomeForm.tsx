import React from "react";
import { Button, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import {
    SiJavascript,
    SiReact,
    SiJquery,
    SiCss3,
    SiHtml5,
    SiNextDotJs,
    SiNodeDotJs,
    SiTypescript,
} from "react-icons/si";
import styled from "@emotion/styled";
import { DetailTitle, Title } from "../../styles/commonStyles";
import Link from "next/link";

const Container = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
    @media all and (max-width: ${(props) => props.theme.desktop}) {
        padding: 5px;
    }
`;

const Stack = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
        margin: 0 6px;
    }
`;

const NewFeed = styled.ul`
    background: #fafbfc;
    padding-top: 10px;
    padding-bottom: 10px;
    li {
        margin: 5px 0;
        width: fit-content;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const Community = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background: #fafbfc;
    padding: 8px 10px;
    div:nth-of-type(1) {
        width: 120px;
    }
    div:nth-of-type(2) {
        margin: 0 9px;
        cursor: pointer;
        flex: 2;
        &:hover {
            text-decoration: underline;
        }
    }
    div:nth-of-type(3) {
    }
`;

const HomeForm = () => {
    return (
        <Container>
            <div>
                <Result
                    icon={<SmileOutlined />}
                    title="반갑습니다 어서오세요! 이곳은 자스위키입니다."
                    subTitle="이곳은 자바스크립트 개발자들이 직접 참여해 코드의 실제 예를 올리고 공유하는 곳입니다."
                    extra={
                        <Link href="/about">
                            <Button type="primary">What is JaSwiki?</Button>
                        </Link>
                    }
                />
            </div>
            <Stack>
                <div>
                    <SiJavascript size={42} fill="#F7DF1E" />
                    <SiReact size={42} fill="#08D9FF" />
                    <SiNextDotJs size={42} fill="#000000" />
                    <SiNodeDotJs size={42} fill="#9EC879" />
                    <SiTypescript size={42} fill="#007ACC" />
                </div>

                <div>
                    <SiHtml5 size={42} fill="#E44F26" />
                    <SiCss3 size={42} fill="#007ACC" />
                    <SiJquery size={42} fill="#F7DF1E" />
                </div>
            </Stack>
            <Title>최근 등록 문서</Title>
            <NewFeed>
                <Link href="/">
                    <li>글 1</li>
                </Link>
                <Link href="/">
                    <li>글 1</li>
                </Link>
                <Link href="/">
                    <li>글 1</li>
                </Link>
                <Link href="/">
                    <li>글 1</li>
                </Link>
                <Link href="/">
                    <li>글 1</li>
                </Link>
                <Link href="/">
                    <li>글 1</li>
                </Link>
                <Link href="/">
                    <li>글 1</li>
                </Link>
            </NewFeed>
            <DetailTitle>한줄잡담</DetailTitle>
            <Community>
                <div>이름</div>
                <Link href="">
                    <div>잡담내용</div>
                </Link>
                <div>날짜</div>
            </Community>
        </Container>
    );
};

export default HomeForm;
