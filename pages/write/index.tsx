import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import EmptyDataComponent from "../../components/common/EmptyData";
import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
import DocsSkeleton from "../../components/common/skeleton/DocsSkeleton";
const WriteForm = dynamic(() => import("../../components/write/WriteForm"), {
    loading: () => <DocsSkeleton />,
    ssr: false,
});

const index = () => {
    const {
        user: { token },
    } = useSelector((state: RootState) => state.auth);
    const data = {
        title: "문서 작성",
        url: "write",
        desc: "문서 작성",
    };
    return (
        <>
            <Seo data={data} />
            {token === null || !token ? (
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
