import React from "react";
import styled from "@emotion/styled";
import { Title } from "../../styles/commonStyles";
import {
    BookAnchor,
    ContentDesc,
    ContentDetail,
    LinkTitle,
} from "../common/DocsDetailComponent";
import { Anchor } from "antd";

const AboutCotainer = styled.div`
    min-height: 100vh;
    padding-bottom: 120px;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;

    & > div:nth-of-type(1) {
        div {
            text-align: right;
        }
    }

    @media all and (max-width: ${(props) => props.theme.desktop}) {
        padding: 5px 8px;
    }
`;

const AboutForm = () => {
    return (
        <AboutCotainer>
            <div>
                <Title>자스위키란?</Title>
                <div>🔐</div>
            </div>
            <div>
                <ContentDesc>
                    <p>
                        자스위키(JaSwiki)란{" "}
                        <strong>JavaScript wikipedia</strong>입니다.
                        <br />
                        자스위키는 자바스크립트를 사용하는 개발자들이 코드와
                        예제들을 마음껏 문서화시키고 <br />
                        허락된 게시물에 대해 자유롭게 편집할 수 있도록
                        지원합니다.
                    </p>

                    <BookAnchor affix={false}>
                        <LinkTitle>목차</LinkTitle>
                        <Anchor.Link href="#WHY?" title="WHY?"></Anchor.Link>
                        <Anchor.Link
                            href="#NextPlan"
                            title="NextPlan"
                        ></Anchor.Link>
                    </BookAnchor>
                </ContentDesc>

                <ContentDetail>
                    <h1 id="WHY?">WHY?</h1>
                    <li>예제의 한글화</li>
                    <br />
                    <p>
                        대다수의 프로그래머들이 공감하겠지만 프로그래머라고 모든
                        코드를 외우고 있지는 않습니다. 어떤 기술을 구현하려다
                        막혔을 땐 누구나 구글에 검색을 하게 되죠. <br />
                        <br />
                        훌륭한 개발자들도 때로는 집단 지성의 힘을 애용합니다.
                        이런 개발자들은 자신만의 노하우를 십분 활용해
                        스택오버플로우나 다양한 루트의 검색을 통해 응용할만한
                        지식을 얻고 곧 실행하게 되죠.
                        <br /> <br />
                        하지만 자바스크립트 생태계에 처음 발을 들이민 개발자들의
                        상황은 어떨까요? 이들의 상황은 좀 다릅니다. 당장에
                        검색에 대한 노하우가 부족합니다. 겨우 검색한 코드나
                        예제들은 2년, 3년이 지난 게시글이 다수입니다. ES6
                        문법으로 만들어 지지 않은 게시글들도 많아 실사용하기엔
                        꺼림직합니다. 그러다가 영어로 검색 하게 되면 이상하게
                        머리가 어지러워지기도 합니다. 만약 새로운 프레임워크,
                        라이브러리를 사용하려는 상황이 온다면? 원하는 기능과
                        코드를 찾기 위해 많은 정신적 에너지와 시간을 소비할
                        것입니다.
                        <br /> <br />
                        이런 사람들에게 필요한건 가능한 최신이고, 한글로
                        되어있는 <strong>상세한 예제</strong>
                        입니다. 스택(React, Next ..etc)에 따른 코드의 여부는
                        물론, 같은 기능임에도 각기 다른 예제들이 존재할
                        것입니다. 우리는 그러한 예제들을 모으고 모아 이곳에 올려
                        모든 사용자와 공유하도록 합니다.
                        <br />
                        <br />
                    </p>
                    <br />
                    <li>쉽고 빠른 검색</li>
                    <br />
                    <p>
                        자스위키의 궁극적인 목적은, 다양한 기능 구현 예제가 모든
                        자바스크립트 개발자들에게 퍼져나가는 것입니다. 즉, 기능
                        구현하기 위해 구글 검색에 어떤 영어로 쳐야할까 고민하지
                        않아도 되는 것입니다.
                        <br /> <br />
                        만일 리액트로 투두리스트를 빌드하드려는 초보 개발자가
                        "투두리스트 만들기"라고 검색하면 투두리스트를 만드는
                        완벽한 설명과 예제가 나오는 것입니다.
                    </p>
                    <h1 id="NextPlan">Next Plan</h1>
                    <li>시리즈 기능</li>
                    <li>댓글 기능</li>
                    <li>커뮤니티 기능</li>
                </ContentDetail>
            </div>
        </AboutCotainer>
    );
};

export default AboutForm;
