import React from "react";
import styled from "@emotion/styled";
import { Title } from "../../styles/commonStyles";
import Link from "next/link";
import DocsDetailComponent from "../common/DocsDetailComponent";
import { doc } from "../../@types/type";
import StackComponent from "../common/StackComponent";
import { levelIconChange } from "../../lib/levelChange";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import marked from "marked";

const DocsContainer = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    margin: 0 auto;

    @media all and (max-width: ${(props) => props.theme.desktop}) {
        padding: 5px 8px;
    }
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
    @media all and (max-width: ${({ theme }) => theme.phone}) {
        span {
            display: none;
        }
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
    @media all and (max-width: ${({ theme }) => theme.phone}) {
        flex-direction: row-reverse;
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

const Del = styled.a`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

type Props = {
    doc: doc;
    _id?: string;
    anchor: string[];
    onDelete: () => void;
    node: any;
};

const DocsForm = ({ doc, _id, onDelete, anchor, node }: Props) => {
    return (
        <>
            <DocsContainer>
                <Title>{doc.title}</Title>
                <StackComponent stack={doc.stack} />
                <StackDetail>
                    <div>
                        <span>이 문서는</span>
                        <StackComponent stack={doc.stack} size={30} />
                        <span>에서 응용이 가능합니다.</span>
                    </div>
                    <DocsDesc>
                        <div>
                            {doc.secret ? (
                                "🔐"
                            ) : (
                                <Link href={`/edit/${doc._id}`}>
                                    <a>편집</a>
                                </Link>
                            )}

                            {_id === doc.creator._id && (
                                <Popconfirm
                                    title="정말 삭제인가요? 다시 복구 하지 못합니다!"
                                    icon={
                                        <QuestionCircleOutlined
                                            style={{ color: "red" }}
                                        />
                                    }
                                    onConfirm={onDelete}
                                >
                                    <Del href="#">삭제</Del>
                                </Popconfirm>
                            )}
                        </div>
                        <div>
                            <div>🕑 {doc.createDate} </div>
                            <div>
                                {levelIconChange(doc.creator.level)}
                                {doc.creator.userId}
                            </div>
                        </div>
                    </DocsDesc>
                </StackDetail>

                <DocsDetailComponent
                    node={node}
                    anchor={anchor}
                    content={marked(doc.content)}
                    description={doc.description}
                />

                <DocsFooter>
                    <div>
                        <div>최초 생성일</div>
                        <span>{doc.createDate}</span>
                    </div>
                    <div>
                        <div>생성자</div>
                        <span>
                            {levelIconChange(doc.creator.level)}{" "}
                            {doc.creator.userId}
                        </span>
                    </div>
                    {doc.recentCreator !== null ? (
                        <div>
                            <div>최근수정자</div>
                            <span>
                                {levelIconChange(doc.recentCreator.level)}{" "}
                                {doc.recentCreator.userId} / {doc.recentUpdate}
                            </span>
                        </div>
                    ) : (
                        <div>
                            <div>최근수정자</div>
                            <span>익명 / {doc.recentUpdate}</span>
                        </div>
                    )}
                    <div>
                        <div>기여자</div>
                        <span>
                            {doc.contributer.map((con) => (
                                <div key={con.userId}>
                                    {levelIconChange(con.level)} {con.userId}
                                </div>
                            ))}
                        </span>
                    </div>
                </DocsFooter>
            </DocsContainer>
        </>
    );
};

export default DocsForm;
