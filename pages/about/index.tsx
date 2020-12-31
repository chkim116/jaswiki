import React from "react";
import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
const AboutForm = dynamic(() => import("../../components/About/AboutForm"));

const about = () => {
    const data = {
        title: "자스위키란?",
        url: "about",
        desc:
            " 자스위키는 자바스크립트를 사용하는 개발자들이 코드와 예제들을 마음껏 문서화시키고 허락된 게시물에 대해 자유롭게 편집할 수 있도록 지원합니다.",
    };

    return (
        <>
            <Seo data={data} />
            <AboutForm></AboutForm>
        </>
    );
};

export default about;
