import React from "react";
import styled from "@emotion/styled";
import { Title } from "../../styles/commonStyles";
import Link from "next/link";
import { Skeleton } from "antd";
import EmptyDataComponent from "../common/EmptyData";
import { doc } from "../../@types/type";
import { useLevelIcon } from "../../hook";

const SearchContainer = styled.div`
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    min-height: 80vh;
`;

const IsSearchTitle = styled.h3`
    width: fit-content;
    margin: 0 auto;
    padding: 10px 0;
    border-bottom: 1px solid ${(props) => props.theme.darkWhite};
`;

const SearchList = styled.div`
    padding: 8px 8px 8px 0;
`;

const SearchContent = styled.div`
    a {
        color: ${(props) => props.theme.link};
        font-weight: 600;
        font-size: ${(props) => props.theme.ls};
    }
    p {
        margin: 8px 0;
    }

    span {
        font-weight: 600;
    }
`;

type Props = {
    searchText: string | string[] | undefined;
    loading: boolean;
    data: doc[];
};

const SearchForm = ({ searchText, loading, data }: Props) => {
    return (
        <SearchContainer>
            <Title>Results : {searchText}</Title>

            {!loading ? (
                <div>
                    {data?.length > 0 ? (
                        <>
                            <IsSearchTitle>
                                {data.length}개의 게시글을 찾았습니다.
                            </IsSearchTitle>
                            <SearchList>
                                {data?.map((doc) => (
                                    <SearchContent>
                                        <Link href={`/doc/${doc._id}`}>
                                            <a>검색목록</a>
                                        </Link>
                                        <div>
                                            <p>{doc.description}</p>
                                            <span>
                                                {useLevelIcon(
                                                    doc.creator.level
                                                )}{" "}
                                                {doc.creator.userId}
                                            </span>
                                        </div>
                                    </SearchContent>
                                ))}
                            </SearchList>
                        </>
                    ) : (
                        <EmptyDataComponent
                            description="문서가 존재하지 않습니다. 모두를 위해
                     작성해주실래요?"
                            route="/write"
                            routeName="문서작성"
                        />
                    )}
                </div>
            ) : (
                <>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </>
            )}
        </SearchContainer>
    );
};

export default SearchForm;
