import React from "react";
import dynamic from "next/dynamic";
const EmptyDataComponent = dynamic(
    () => import("../../components/common/EmptyData")
);

const index = () => {
    return (
        <EmptyDataComponent
            description="페이지를 불러올 수 없습니다."
            route="/"
            routeName="메인으로"
        />
    );
};

export default index;
