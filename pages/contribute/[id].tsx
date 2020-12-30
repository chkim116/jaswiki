import { useRouter } from "next/dist/client/router";
import React from "react";
import useSWR from "swr";
import ContributeForm from "../../components/contribute/ContributeForm";
import Axios from "axios";
import DocsSkeleton from "../../components/common/skeleton/DocsSkeleton";

const fetcher = (url: string) => {
    return Axios.get(url).then((res) => res.data);
};

const index = () => {
    const router = useRouter();
    const { data, error } = useSWR(`/docs/user/${router.query.id}`, fetcher);

    return (
        <>
            {data ? (
                <ContributeForm data={data}></ContributeForm>
            ) : (
                <DocsSkeleton />
            )}
        </>
    );
};

export default index;
