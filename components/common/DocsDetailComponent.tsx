import React from "react";
import styled from "@emotion/styled";
import { Anchor } from "antd";
import { DetailTitle } from "../../styles/commonStyles";
const { Link } = Anchor;

const Content = styled.div``;

const ContentDesc = styled.div`
    display: flex;
    justify-content: space-between;
    @media all and (max-width: ${(props) => props.theme.desktop}) {
        flex-direction: column;
    }
`;

const BookAnchor = styled(Anchor)`
    min-width: 300px;
    max-width: 300px;
    padding-bottom: 36px;
    @media all and (max-width: ${(props) => props.theme.desktop}) {
        margin: 0 auto;
    }
`;

export const LinkTitle = styled.div`
    background: ${(props) => props.theme.darkWhite};
    text-align: center;
    padding: 6px 0;
    font-size: ${(props) => props.theme.ls};
    color: ${(props) => props.theme.black};
`;

export const ContentDetail = styled.div`
    width: 100%;
    min-height: 300px;
    h1 {
        position: relative;
        margin-top: 40px;
        padding-bottom: 12px;
        &:after {
            width: 30px;
            height: 1px;
            content: "";
            position: absolute;
            bottom: 0px;
            left: 0;
            border-bottom: 2px solid ${(props) => props.theme.darkWhite};
        }
    }
`;

type Props = {
    anchor?: string[];
    detailTitle?: string[];
};

const DocsDetailComponent = ({ anchor, detailTitle }: Props) => {
    return (
        <Content>
            <ContentDesc>
                <p>
                    자스위키는 ~~합니다.자스위키는 ~~합니다.자스위키는
                    ~~합니다.자스위키는 ~~합니다.자스위키는 ~~합니다.자스위키는
                    ~~합니다.자스위키는 ~~합니다.자스위키는 ~~합니다.자스위키는
                    ~~합니다.자스위키는 ~~합니다.자스위키는 ~~합니다.자스위키는
                    ~~합니다.자스위키는 ~~합니다.자스위키는 ~~합니다.자스위키는
                    ~~합니다.자스위키는 ~~합니다.자스위키는 ~~합니다.자스위키는
                    ~~합니다.자스위키는 ~~합니다.자스위키는 ~~합니다.자스위키는
                    ~~합니다.자스위키는 ~~합니다.
                </p>
                <BookAnchor affix={false}>
                    <LinkTitle>목차</LinkTitle>
                    <Link href="#개요" title="개요" />
                    <Link href="#연습" title="연습" />
                    <Link href="#응용" title="응용">
                        <Link href="#Link-Props" title="Link Props" />
                    </Link>
                    <Link href="#참고" title="참고"></Link>
                </BookAnchor>
            </ContentDesc>

            <ContentDetail>
                <DetailTitle id="개요">1. 개요</DetailTitle>
            </ContentDetail>
            <ContentDetail>
                <DetailTitle id="연습">2. 연습</DetailTitle>
            </ContentDetail>
            <ContentDetail>
                <DetailTitle id="응용">3. 응용</DetailTitle>
            </ContentDetail>
            <ContentDetail>
                <DetailTitle id="참고">4. 참고</DetailTitle>
            </ContentDetail>
        </Content>
    );
};

export default DocsDetailComponent;
