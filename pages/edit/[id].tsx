import { useRouter } from "next/dist/client/router";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import dynamic from "next/dynamic";
const WriteForm = dynamic(() => import("../../components/write/WriteForm"));

const index = () => {
    const router = useRouter();
    const { id } = router.query;
    const { doc } = useSelector((state: RootState) => state.docs);

    if (doc.secret) {
        router.back();
    }

    return <WriteForm isEdit={true} route={id as string} doc={doc}></WriteForm>;
};

export default index;
