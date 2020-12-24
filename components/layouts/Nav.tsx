import React from "react";
import styled from "@emotion/styled";
import { SiJavascript } from "react-icons/si";
import { Input } from "antd";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";

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
    ul {
        padding: 0;
        margin: 0;
        position: absolute;
        width: 100px;
        display: none;
        text-align: center;

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

    &:hover {
        ul {
            display: block;
        }
    }
`;

const Nav = () => {
    return (
        <Container>
            <Navigation>
                <List>
                    <div>
                        <SiJavascript size={54} fill="#FBE574" />
                    </div>
                    <div>
                        <Input.Search
                            size="large"
                            placeholder="검색하세요"
                            enterButton
                        />
                    </div>

                    <UserBadge>
                        <Badge count={0}>
                            <Avatar shape="square" icon={<UserOutlined />} />
                            <ul>
                                <li>계정 생성</li>
                                <li>로그인</li>
                            </ul>
                        </Badge>
                    </UserBadge>
                </List>
            </Navigation>
        </Container>
    );
};

export default Nav;
