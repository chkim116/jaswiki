import React from "react";
import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
const EmptyDataComponent = dynamic(
    () => import("../../components/common/EmptyData")
);

const index = () => {
    const data = {
        title: "에러?",
        desc: "",
        url: "",
    };

    return (
        <>
            <Seo data={data} />
            <EmptyDataComponent
                description="페이지를 불러올 수 없습니다."
                route="/"
                routeName="메인으로"
            />
        </>
    );
};

export default index;
