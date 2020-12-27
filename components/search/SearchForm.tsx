import React from "react";
import styled from "@emotion/styled";
import { Title } from "../../styles/commonStyles";
import Link from "next/link";
import { Skeleton } from "antd";
import EmptyDataComponent from "../common/EmptyData";

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
};

const SearchForm = ({ searchText, loading }: Props) => {
    return (
        <SearchContainer>
            <Title>Results : {searchText}</Title>

            {loading ? (
                <div>
                    {searchText ? (
                        <>
                            <IsSearchTitle>
                                1,138개의 게시글을 찾았습니다.
                            </IsSearchTitle>
                            <SearchList>
                                <SearchContent>
                                    <Link href="/docs/3">
                                        <a>검색목록</a>
                                    </Link>
                                    <div>
                                        <p>
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Ipsa
                                            cum aut maiores eius, omnis mollitia
                                            reiciendis consequatur dicta modi
                                            repudiandae fuga! Temporibus eos
                                            deleniti laboriosam officia sit
                                            dolore iure omnis!
                                        </p>
                                        <span>생성자</span>
                                    </div>
                                </SearchContent>
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
