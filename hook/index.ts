import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadSuccess } from "../redux/commonLoading";

export const usePush = (value: any, route: string) => {
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        if (value) {
            router.push(route);
            dispatch(loadSuccess());
        }
    }, [value]);
};
