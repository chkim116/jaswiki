import React from "react";
import styled from "@emotion/styled";
import { Title } from "../../styles/commonStyles";
import Link from "next/link";
import DocsDetailComponent from "../common/DocsDetailComponent";
import { doc } from "../../@types/type";
import StackComponent from "../common/StackComponent";
import { useLevelIcon } from "../../hook";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import DocsSkeleton from "../common/skeleton/DocsSkeleton";

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

const Del = styled.a`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

type Props = {
    doc: doc;
    id?: string;
    onDelete: () => void;
};

const DocsForm = ({ doc, id, onDelete }: Props) => {
    return (
        <>
            {doc ? (
                <DocsContainer>
                    <Title>
                        {doc.title}
                        <StackComponent stack={doc.stack} />
                    </Title>
                    <StackDetail>
                        <div>
                            <span>이 문서는</span>
                            <StackComponent stack={doc.stack} size={30} />
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
                                {id === doc.creator.id && (
                                    <Popconfirm
                                        title="Are you sure？"
                                        icon={
                                            <QuestionCircleOutlined
                                                style={{ color: "red" }}
                                            />
                                        }
                                        onConfirm={onDelete}>
                                        <Del href="#">삭제</Del>
                                    </Popconfirm>
                                )}
                            </div>
                            <div>
                                <div>🕑 {doc.createDate} </div>
                                <div>
                                    {useLevelIcon(doc.creator.level)}
                                    {doc.creator.userId}
                                </div>
                            </div>
                        </DocsDesc>
                    </StackDetail>

                    <DocsDetailComponent
                        content={doc.content}
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
                                {useLevelIcon(doc.creator.level)}
                                {doc.creator.userId}
                            </span>
                        </div>
                        {doc.recentCreator.userId && (
                            <div>
                                <div>최근 수정</div>
                                <span>
                                    {useLevelIcon(doc.recentCreator.level)}
                                    {doc.recentCreator.userId} /
                                    {doc.recentUpdate}
                                </span>
                            </div>
                        )}
                        <div>
                            <div>기여자</div>
                            <span>
                                {doc.contributer.map((con) => (
                                    <span key={con.userId}>
                                        {useLevelIcon(con.level)} {con.userId}
                                    </span>
                                ))}
                            </span>
                        </div>
                    </DocsFooter>
                </DocsContainer>
            ) : (
                <DocsSkeleton />
            )}
        </>
    );
};

export default DocsForm;
