import React from "react";
import styled from "@emotion/styled";
import { Anchor } from "antd";
import { useReplace } from "@cooksmelon/utils";

const Content = styled.div``;

const ContentDesc = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 250px;
    @media all and (max-width: ${(props) => props.theme.desktop}) {
        flex-direction: column;
    }
`;

const BookAnchor = styled(Anchor)`
    min-width: 300px;
    max-width: 300px;
    padding: 0;
    border-bottom: 1px solid ${(props) => props.theme.darkWhite};
    margin-bottom: 36px;
    @media all and (max-width: ${(props) => props.theme.desktop}) {
        margin: 0 auto;
        width: 100%;
        max-width: 96%;
        min-height: 150px;
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

    blockquote {
        border-left: 2px solid ${(props) => props.theme.green};
        padding-left: 10px;
        font-size: ${(props) => props.theme.ls};
        font-weight: 500;
        margin: 5px 0;
    }

    pre {
        background-color: #fafbfc;
        overflow: auto;
        padding: 8px;
        margin: 5px 0;
    }
`;

type Props = {
    content: string;
    description: string;
    anchor: string[];
    node: any;
};

const DocsDetailComponent = ({ content, description, anchor, node }: Props) => {
    return (
        <Content>
            <ContentDesc>
                <p
                    dangerouslySetInnerHTML={{
                        __html: description.replace(
                            /(?:\r\n|\r|\n)/g,
                            "<br />"
                        ),
                    }}></p>
                {anchor && (
                    <BookAnchor affix={false}>
                        <LinkTitle>목차</LinkTitle>
                        {anchor.map((word) => (
                            <Anchor.Link
                                key={word}
                                href={`#${useReplace(word)
                                    .replace(
                                        /[\!\@\#\$\%\^\&\*\(\)\_\+\?\.\,\_\=\~\`\/\*\-\+]+/g,
                                        ""
                                    )
                                    .replace(/ /g, "-")
                                    .toLowerCase()}`}
                                title={useReplace(word)}></Anchor.Link>
                        ))}
                    </BookAnchor>
                )}
            </ContentDesc>

            <ContentDetail
                ref={node}
                dangerouslySetInnerHTML={{ __html: content }}></ContentDetail>
        </Content>
    );
};

export default DocsDetailComponent;
