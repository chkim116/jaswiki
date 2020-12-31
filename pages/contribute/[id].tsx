import { useRouter } from "next/dist/client/router";
import React from "react";
import useSWR from "swr";
import Axios from "axios";
import DocsSkeleton from "../../components/common/skeleton/DocsSkeleton";
import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
const ContributeForm = dynamic(
    () => import("../../components/contribute/ContributeForm")
);

const fetcher = (url: string) => {
    return Axios.get(url).then((res) => res.data);
};

const index = () => {
    const router = useRouter();
    const { data, error } = useSWR(`/docs/user/${router.query.id}`, fetcher);

    const dataSeo = {
        title: "기여도",
        url: "contribute",
        desc: "나의 기여도를 확인하고 내가 쓴 글도 확인하세요",
    };

    return (
        <>
            {data && <Seo data={dataSeo} />}
            {data ? (
                <ContributeForm data={data}></ContributeForm>
            ) : (
                <DocsSkeleton />
            )}
        </>
    );
};

export default index;
