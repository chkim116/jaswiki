import { useRouter } from "next/dist/client/router";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import DocsForm from "../../components/docs/DocsForm";
import { RootState } from "../../redux";
import { loadRequest } from "../../redux/commonLoading";
import { delDocsRequest, getDocByIdRequest } from "../../redux/docs";
import wrapper from "../../store/configureStore";

const index = () => {
    const { doc } = useSelector((state: RootState) => state.docs);
    const { id } = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    const dispatch = useDispatch();

    const onDelete = useCallback(() => {
        dispatch(delDocsRequest(router.query.id));
        dispatch(loadRequest());
        window.location.href = "/";
    }, [dispatch, router]);

    return <DocsForm doc={doc} onDelete={onDelete} id={id}></DocsForm>;
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const { store, params } = ctx;
    const { id } = params as { id: string };
    console.log(id);
    store.dispatch(getDocByIdRequest(id));
    store.dispatch(END);
    await store.sagaTask?.toPromise();
});

export default index;
