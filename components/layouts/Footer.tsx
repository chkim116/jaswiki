import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const FooterContainer = styled.footer`
    width: 100%;
    background-color: #303740;
    min-height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const FooterInfo = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    font-size: ${(props) => props.theme.ls};
    div {
        color: ${(props) => props.theme.white};
        &:nth-of-type(1) {
            display: flex;
            margin-bottom: 12px;
            font-size: ${(props) => props.theme.ms};
            div {
                cursor: pointer;
                margin: 0 3px;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterInfo>
                <div>
                    <Link href="/tutorial">
                        <div>사용 설명서 |</div>
                    </Link>
                    <Link href="/about">
                        <div>자스위키에 대해</div>
                    </Link>
                </div>
                <div>&copy; JaSwiki 2020</div>
            </FooterInfo>
        </FooterContainer>
    );
};

export default Footer;
