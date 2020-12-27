import { useRouter } from "next/dist/client/router";
import React from "react";
import { useSelector } from "react-redux";
import WriteForm from "../../components/write/WriteForm";
import { RootState } from "../../redux";

const index = () => {
    const router = useRouter();
    const { id } = router.query;
    const { doc } = useSelector((state: RootState) => state.docs);

    console.log(id, doc);

    return <WriteForm isEdit={true} route={id as string} doc={doc}></WriteForm>;
};

export default index;
