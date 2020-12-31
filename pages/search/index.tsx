import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
import DocsSkeleton from "../../components/common/skeleton/DocsSkeleton";
const SearchForm = dynamic(() => import("../../components/search/SearchForm"), {
    loading: () => <DocsSkeleton />,
});

const fetcher = (url: string) => {
    return Axios.post(url).then((res) => res.data);
};

const search = () => {
    const {
        query: { q },
    } = useRouter();
    const [loading, setLoading] = useState(true);
    const { data, error } = useSWR(`/docs/search?q=${q}`, fetcher);

    useEffect(() => {
        if (data) {
            setLoading(false);
        }
    }, [data]);

    const dataSeo = {
        title: `${q} 검색결과`,
        url: `search?q=${q}`,
        desc: `${q}를 검색한 결과는 다음과 같습니다.`,
    };

    return (
        <>
            <Seo data={dataSeo} />
            <SearchForm
                loading={loading}
                searchText={q}
                data={data}></SearchForm>
        </>
    );
};

export default search;
