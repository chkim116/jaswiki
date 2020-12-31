import { useRouter } from "next/dist/client/router";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
import DocsSkeleton from "../../components/common/skeleton/DocsSkeleton";
const WriteForm = dynamic(() => import("../../components/write/WriteForm"), {
    loading: () => <DocsSkeleton />,
});

const index = () => {
    const router = useRouter();
    const { id } = router.query;
    const { doc } = useSelector((state: RootState) => state.docs);

    if (doc.secret) {
        router.back();
    }

    const data = {
        title: "게시글 수정",
        url: `edit/${id}`,
        desc: "게시글 수정",
    };

    return (
        <>
            <Seo data={data} />
            <WriteForm isEdit={true} route={id as string} doc={doc}></WriteForm>
        </>
    );
};

export default index;
