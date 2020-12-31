import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import EmptyDataComponent from "../../components/common/EmptyData";
import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
const WriteForm = dynamic(() => import("../../components/write/WriteForm"));

const index = () => {
    const { isLogin } = useSelector((state: RootState) => state.auth);

    const data = {
        title: "문서 작성",
        url: "write",
        desc: "문서 작성",
    };
    return (
        <>
            <Seo data={data} />
            {!isLogin ? (
                <EmptyDataComponent
                    description="회원만 문서 작성이 가능합니다."
                    route="/login"
                    routeName="로그인하기"
                />
            ) : (
                <WriteForm />
            )}
        </>
    );
};

export default index;
