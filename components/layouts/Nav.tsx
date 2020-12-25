import React from "react";
import styled from "@emotion/styled";
import { SiJavascript } from "react-icons/si";
import { Button, Input } from "antd";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

const Container = styled.div`
    width: 100%;
    background: #fafbfc;
`;

const Navigation = styled.header`
    width: 100%;
    height: 80px;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    display: flex;
    align-items: center;
`;

const List = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div:nth-of-type(2) {
        width: 350px;
    }
`;

const UserBadge = styled.div`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;

    button {
        margin-right: 8px;
    }
    ul {
        background: ${(props) => props.theme.white};
        padding: 0;
        margin: 0;
        position: absolute;
        width: 100px;
        display: none;
        text-align: center;
        z-index: 550;

        li {
            list-style: none;
            border: 1px solid ${(props) => props.theme.darkWhite};
            padding: 10px;
            margin: 0;
            &:hover {
                background-color: #ededed;
            }
        }
    }

    span {
        &:hover {
            ul {
                display: block;
            }
        }
    }
`;

type Props = {
    onSearch: (
        value: string,
        event?:
            | React.ChangeEvent<HTMLInputElement>
            | React.MouseEvent<HTMLElement, MouseEvent>
            | React.KeyboardEvent<HTMLInputElement>
    ) => void;
};

const Nav = ({ onSearch }: Props) => {
    return (
        <Container>
            <Navigation>
                <List>
                    <Link href="/">
                        <div>
                            <SiJavascript
                                size={54}
                                style={{ cursor: "pointer" }}
                                fill="#FBE574"
                            />
                        </div>
                    </Link>
                    <div>
                        <Input.Search
                            onSearch={onSearch}
                            size="large"
                            placeholder="검색하세요"
                            enterButton
                        />
                    </div>

                    <UserBadge>
                        <Link href="/write">
                            <Button type="primary">문서작성</Button>
                        </Link>
                        <Badge count={0}>
                            <Avatar shape="square" icon={<UserOutlined />} />
                            <ul>
                                <Link href="/register">
                                    <li>계정 생성</li>
                                </Link>
                                <Link href="/login">
                                    <li>로그인</li>
                                </Link>
                            </ul>
                        </Badge>
                    </UserBadge>
                </List>
            </Navigation>
        </Container>
    );
};

export default Nav;
