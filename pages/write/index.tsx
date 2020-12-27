import React from "react";
import WriteForm from "../../components/write/WriteForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import EmptyDataComponent from "../../components/common/EmptyData";

const index = () => {
    const { isLogin } = useSelector((state: RootState) => state.auth);

    return (
        <>
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
