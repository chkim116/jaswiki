import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeForm from "../components/Home/HomeForm";
import { RootState } from "../redux";
import { getDocsRequest } from "../redux/docs";

const index = () => {
    const dispatch = useDispatch();
    const { docs, isDone } = useSelector((state: RootState) => state.docs);

    useEffect(() => {
        dispatch(getDocsRequest());
    }, []);

    return <HomeForm docs={docs} isDone={isDone}></HomeForm>;
};

export default index;
