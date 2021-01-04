import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { SiJavascript } from "react-icons/si";
import { Button, Input } from "antd";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { useInput } from "@cooksmelon/event";
import { useRouter } from "next/dist/client/router";

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
    @media all and (max-width: ${({ theme }) => theme.desktop}) {
        padding: 0 8px;
    }
`;

const List = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SearchDeskTop = styled.div`
    width: 350px;

    @media all and (max-width: ${({ theme }) => theme.phone}) {
        display: none;
    }
`;

const SearchBtn = styled.div`
    display: none;
    @media all and (max-width: ${({ theme }) => theme.phone}) {
        display: flex;
        flex: 1;
        justify-content: center;
        margin-right: 5px;
        form {
            display: flex;
            align-items: center;
            input {
                all: unset;
                width: 200px;
                border: 1px solid #dbdbdb;
                padding: 5px 11px;
                background-color: #ffffff;
            }
        }
    }
`;

const WriteBtn = styled(Button)`
    @media all and (max-width: ${({ theme }) => theme.desktop}) {
        display: none;
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
        right: 0;
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
    token: string;
    id: string;
    onLogOut: () => void;
    onSearch: (
        value: string,
        event?:
            | React.ChangeEvent<HTMLInputElement>
            | React.MouseEvent<HTMLElement, MouseEvent>
            | React.KeyboardEvent<HTMLInputElement>
    ) => void;
};

const Nav = ({ onSearch, onLogOut, id, token }: Props) => {
    const [text, onChange, setText] = useInput("");
    const router = useRouter();

    const onSubmit = useCallback(() => {
        router.push(`/search?q=${text}`);
        setText(() => "");
    }, [text]);

    const onFormSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            router.push(`/search?q=${text}`);
            setText(() => "");
        },
        [text]
    );

    return (
        <Container>
            <Navigation>
                <List>
                    <Link href="/">
                        <a>
                            <div>
                                <SiJavascript
                                    size={44}
                                    style={{ cursor: "pointer" }}
                                    fill="#f1d900"
                                />
                            </div>
                        </a>
                    </Link>
                    <SearchDeskTop>
                        <Input.Search
                            onSearch={onSearch}
                            size="large"
                            placeholder="다양한 예제들을 검색하세요"
                            enterButton
                        />
                    </SearchDeskTop>
                    <SearchBtn>
                        <form onSubmit={onFormSubmit}>
                            <input
                                onChange={onChange}
                                type="text"
                                value={text}
                                placeholder="다양한 예제들을 검색하세요"
                            />
                            <Button type="primary" onClick={onSubmit}>
                                <IoSearch size={20} color="#ffffff" />
                            </Button>
                        </form>
                    </SearchBtn>

                    <UserBadge>
                        <Link href="/write">
                            <a>
                                <WriteBtn type="primary">문서작성</WriteBtn>
                            </a>
                        </Link>
                        <Badge count={0}>
                            <Avatar shape="square" icon={<UserOutlined />} />
                            {token ? (
                                <ul>
                                    <Link href={`/write`}>
                                        <li>문서 작성</li>
                                    </Link>
                                    <Link href={`/contribute/${id}`}>
                                        <li>기여도</li>
                                    </Link>
                                    <li onClick={onLogOut}>로그아웃</li>
                                </ul>
                            ) : (
                                <ul>
                                    <Link href="/register">
                                        <li>계정 생성</li>
                                    </Link>
                                    <Link href="/login">
                                        <li>로그인</li>
                                    </Link>
                                </ul>
                            )}
                        </Badge>
                    </UserBadge>
                </List>
            </Navigation>
        </Container>
    );
};

export default Nav;
