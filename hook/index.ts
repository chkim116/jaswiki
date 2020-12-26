import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

export const usePush = (value: any, route: string) => {
    const router = useRouter();

    useEffect(() => {
        if (value) {
            router.push(route);
        }
    }, [value]);
};
