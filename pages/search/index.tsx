import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import SearchForm from "../../components/search/SearchForm";

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

    return (
        <SearchForm loading={loading} searchText={q} data={data}></SearchForm>
    );
};

export default search;
