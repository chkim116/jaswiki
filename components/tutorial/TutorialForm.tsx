import React from "react";
import styled from "@emotion/styled";
import { Title } from "../../styles/commonStyles";

const Container = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    min-height: 100vh;
    font-size: 1.125rem;
    ul {
        padding: 8px 0;
        margin: 0;
        list-style: none;
    }
`;

const LevelDesc = styled.li`
    border: 1px solid ${(props) => props.theme.darkWhite};
    width: fit-content;
    margin: 9px 0;
    padding: 10px;
    & > span {
        margin: 0 12px;
        &:nth-of-type(1) {
            padding-right: 8px;
            border-right: 1px solid ${(props) => props.theme.darkWhite};
        }
    }
`;

const TutorialForm = () => {
    return (
        <Container>
            <div>
                <Title>글 작성법</Title>
                <p>
                    기본적으로 회원가입 후 로그인 해야 문서 작성이 가능합니다.
                </p>
                <p>
                    자스위키는 마크다운 에디터를 지원하며, 링크 및 이미지를
                    첨부할 수 있습니다.
                </p>
                <Title>편집</Title>
                <p>누구나 편집이 가능합니다.</p>
                <p>
                    하지만 만약 문서 작성자가 수정하지 못하게 자물쇠(🔐)를
                    걸어놓는다면 편집할 수 없습니다.
                </p>
                <p>
                    비로그인 상태로도 편집이 가능하지만, 기여자 목록에 빠지게
                    됩니다. 가능한 로그인하셔서 기여도도 올리고 기여자가 되어
                    레벨업도 하세요!
                </p>
                <Title>기여도</Title>
                <p>자스위키에서는 기여도를 측정합니다.</p>
                <p>
                    새로운 문서를 작성하면 100점이 추가되고, 수정하면 기여도
                    50점이 추가됩니다.
                </p>
                <p>기여도에 따라 레벨의 여부가 달라집니다.</p>
                <Title>레벨업</Title>
                <p>
                    자스위키의 레벨은 1부터 7까지있고, 레벨에 따라 아이콘이
                    달라집니다.{" "}
                </p>
                <ul>
                    <LevelDesc>
                        <span>레벨 1</span>
                        <span>📜</span> / <span>1000점</span>
                    </LevelDesc>
                    <LevelDesc>
                        <span>레벨 2</span>
                        <span>📝</span> / <span>2000점</span>
                    </LevelDesc>
                    <LevelDesc>
                        <span>레벨 3</span>
                        <span>📘</span> / <span>3000점</span>
                    </LevelDesc>
                    <LevelDesc>
                        <span>레벨 4</span>
                        <span>📖</span> / <span>4000점</span>
                    </LevelDesc>
                    <LevelDesc>
                        <span>레벨 5</span>
                        <span>📚</span> / <span>5000점</span>
                    </LevelDesc>
                    <LevelDesc>
                        <span>레벨 6</span>
                        <span>🎓</span> / <span>6000점</span>
                    </LevelDesc>
                    <LevelDesc>
                        <span>레벨 7</span>
                        <span>🧞</span> / <span>7000점+</span>
                    </LevelDesc>
                </ul>
            </div>
        </Container>
    );
};

export default TutorialForm;
