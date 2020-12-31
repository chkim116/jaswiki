import React from "react";
import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
const TutorialForm = dynamic(
    () => import("../../components/tutorial/TutorialForm")
);

const data = {
    title: "사용 설명서",
    url: "tutorial",
    desc:
        "기본적으로 회원가입 후 로그인 해야 문서 작성이 가능합니다. 자스위키는 마크다운 에디터를 지원하며, 링크 및 이미지를 첨부할 수 있습니다.",
};

const tutorial = () => {
    return (
        <>
            <Seo data={data} />
            <TutorialForm></TutorialForm>
        </>
    );
};

export default tutorial;
