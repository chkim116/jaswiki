import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { loadRequest } from "../../redux/commonLoading";
import { delDocsRequest, getDocById } from "../../redux/docs";
import Axios from "axios";
import marked from "marked";
import { highlights } from "../../lib/highlight";
import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
import { GetServerSideProps } from "next";
import DocsSkeleton from "../../components/common/skeleton/DocsSkeleton";
const DocsForm = dynamic(() => import("../../components/docs/DocsForm"), {
    loading: () => <DocsSkeleton />,
});

const fetcher = (url: string) => {
    return Axios.get(url).then((res) => res.data);
};

type Props = {
    data: any;
};

const index = ({ data }: Props) => {
    const id = useSelector((state: RootState) => state.auth.user);
    const [anchor, setAnchor] = useState<string[]>([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const node = useRef<any>(null);
    const nodes = node.current?.querySelectorAll("pre");
    // 수정 시를 위해 리덕스에 저장
    useEffect(() => {
        if (data) {
            const html = marked(data.content);
            // 앵커 등록을 위한 replace
            const head = html.match(
                /<([h][1])[^>]*>[ㄱ-ㅎ\ㅏ-ㅣ\가-힣\w\s\.\!\@\#\$\%\^\&\*\(\)\-\=\+\_\?\,\;\"\'\\\|\/\*\~']+<\/\1>/g
            ) as string[];
            setAnchor(head);
            dispatch(getDocById(data));
        }
    }, []);

    const onDelete = useCallback(() => {
        dispatch(delDocsRequest({ router: router.query.id, _id: id._id }));
        dispatch(loadRequest());
        window.location.href = "/";
    }, [dispatch, router]);

    useEffect(() => {
        if (nodes) {
            highlights(nodes);
        }
    }, [nodes]);

    const dataSeo = {
        title: `${data?.title}`,
        url: `docs/${router.query.id}`,
        desc: `${data?.description}`,
        images: "",
    };

    return (
        <>
            {data && <Seo data={dataSeo} />}
            <DocsForm
                doc={data}
                onDelete={onDelete}
                _id={id?._id}
                node={node}
                anchor={anchor}
            ></DocsForm>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const data = await fetcher(`/docs/${ctx.query.id}`);
    return { props: { data } };
};

export default index;
