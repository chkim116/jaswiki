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

const setIcon = [
    {
        level: 1,
        levelIcon: "📜",
    },
    {
        level: 2,
        levelIcon: "📝",
    },
    {
        level: 3,
        levelIcon: "📘",
    },
    {
        level: 4,
        levelIcon: "📖",
    },
    {
        level: 5,
        levelIcon: "📚",
    },
    {
        level: 6,
        levelIcon: "🎓",
    },
    {
        level: 7,
        levelIcon: "🧞",
    },
];
export const useLevelIcon = (userLevel: number) => {
    if (process.browser && userLevel) {
        const icon = setIcon.filter((grade) => grade.level === userLevel);
        return icon[0].levelIcon;
    }
};
