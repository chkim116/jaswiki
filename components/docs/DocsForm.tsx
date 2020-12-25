import React from "react";
import styled from "@emotion/styled";
import { Title } from "../../styles/commonStyles";
import Link from "next/link";
import { SiJavascript, SiReact } from "react-icons/si";
import DocsDetailComponent from "../common/DocsDetailComponent";

const DocsContainer = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    margin: 0 auto;
`;

const StackDetail = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 36px;
    span {
        margin: 0 3px;
    }
`;

const DocsDesc = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    div {
        display: flex;

        div {
            margin-right: 8px;
        }

        a {
            color: ${(props) => props.theme.link};
            margin-right: 8px;
        }
    }
`;

const DocsFooter = styled.div`
    width: 100%;
    background: #fafbfc;
    min-height: 100px;
    border-top: ${(props) => props.theme.darkWhite};
    padding: 10px;
    line-height: 30px;
    font-size: ${(props) => props.theme.ms};
    margin: 120px 0;
    border-radius: 12px;
    & > div {
        display: flex;

        & > div {
            width: 100px;
            text-align: center;
        }
    }
`;

const DocsForm = () => {
    return (
        <DocsContainer>
            <Title>
                Docs...
                <span>
                    <SiJavascript fill="#FBE574" size={24} />
                    <SiReact fill="blue" size={24} />
                </span>
            </Title>
            <StackDetail>
                <div>
                    <span>이 문서는</span>
                    <SiJavascript fill="#FBE574" size={30} />
                    <SiReact fill="blue" size={30} />
                    <span>에서 응용이 가능합니다.</span>
                </div>
                <DocsDesc>
                    <div>
                        <Link href="/">
                            <a>편집</a>
                        </Link>
                        <Link href="/">
                            <a>문서정보</a>
                        </Link>
                    </div>
                    <div>
                        <div>🕑 {new Date().toLocaleDateString()} </div>
                        <div>🎓JaSwiki</div>
                    </div>
                </DocsDesc>
            </StackDetail>

            <DocsDetailComponent />

            <DocsFooter>
                <div>
                    <div>최초 생성일</div>
                    <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div>
                    <div>생성자</div>
                    <span>🎓JaSwiki</span>
                </div>
                <div>
                    <div>최근 수정</div>
                    <span>🎓Retwiki / {new Date().toLocaleDateString()}</span>
                </div>
                <div>
                    <div>기여자</div>
                    <span>🎓JaSwiki, 🎓Retwiki</span>
                </div>
            </DocsFooter>
        </DocsContainer>
    );
};

export default DocsForm;
