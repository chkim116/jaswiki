import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import SearchForm from "../components/search/SearchForm";

const search = () => {
    const {
        query: { q },
    } = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
        setTimeout(() => {
            setLoading(true);
        }, 1000);
    }, [q]);

    return <SearchForm loading={loading} searchText={q}></SearchForm>;
};

export default search;
