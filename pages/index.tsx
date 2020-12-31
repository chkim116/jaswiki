import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { getDocsRequest } from "../redux/docs";
import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
const HomeForm = dynamic(() => import("../components/Home/HomeForm"));

const index = () => {
    const dispatch = useDispatch();
    const { docs, isDone } = useSelector((state: RootState) => state.docs);

    useEffect(() => {
        dispatch(getDocsRequest());
    }, []);

    const data = {
        title: "자스위키 Jaswiki",
        url: "",
        desc: "",
        image: "",
    };
    return (
        <>
            <Seo data={data} />
            <HomeForm docs={docs} isDone={isDone}></HomeForm>
        </>
    );
};

export default index;
