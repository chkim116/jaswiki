import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocsForm from "../../components/docs/DocsForm";
import { RootState } from "../../redux";
import { loadRequest } from "../../redux/commonLoading";
import { delDocsRequest, getDocById } from "../../redux/docs";
import useSwr from "swr";
import Axios from "axios";
import marked from "marked";
import { highlights } from "../../lib/highlight";

const fetcher = (url: string) => {
    return Axios.get(url).then((res) => res.data);
};

const index = () => {
    const { _id } = useSelector((state: RootState) => state.auth.user);
    const [anchor, setAnchor] = useState<string[]>([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const { data, error } = useSwr(`/docs/${router.query.id}`, fetcher);
    const node = useRef<any>(null);
    const nodes = node.current?.querySelectorAll("pre");

    // 수정 시를 위해 리덕스에 저장
    useEffect(() => {
        if (data) {
            const html = marked(data.content);
            // 앵커 등록을 위한 replace
            const head = html.match(
                /<([h][1])[^>]*>[ㄱ-ㅎ\ㅏ-ㅣ\가-힣\w\s\.\!\@\#\$\%\^\&\*\(\)\-\=\+\_\?\,\;\"\'\\\|\/\*']+<\/\1>/g
            ) as string[];
            setAnchor(head);
            dispatch(getDocById(data));
        }
    }, [data, error]);

    const onDelete = useCallback(() => {
        dispatch(delDocsRequest({ router: router.query.id, _id: _id }));
        dispatch(loadRequest());
        window.location.href = "/";
    }, [dispatch, router]);

    useEffect(() => {
        if (nodes) {
            highlights(nodes);
        }
    }, [nodes]);

    return (
        <DocsForm
            doc={data}
            onDelete={onDelete}
            _id={_id}
            node={node}
            anchor={anchor}></DocsForm>
    );
};

export default index;
