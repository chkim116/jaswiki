import React, { useCallback, useEffect, useState } from "react";
import wrapper from "../store/configureStore";
import "../styles/global.css";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import { Wrapper } from "../styles/commonStyles";
import { useRouter } from "next/dist/client/router";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { getAuthRequest, logoutRequest } from "../redux/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styled from "@emotion/styled";
import Axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import { BsArrowUp } from "react-icons/bs";
const Nav = dynamic(() => import("../components/layouts/Nav"), { ssr: false });
const Footer = dynamic(() => import("../components/layouts/Footer"));

const Loader = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ArrowUp = styled.button`
    position: fixed;
    bottom: 7%;
    right: 7%;
    padding: 8px;
    line-height: 100%;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.black};
    z-index: 300;
    transition: all 300ms;
    @media all and (max-width: ${({ theme }) => theme.desktop}) {
        right: 2%;
        bottom: 2%;
    }
    &:hover {
        background-color: ${({ theme }) => theme.darkWhite};
    }
`;

// 페이지의 공통
Axios.defaults.baseURL =
    process.env.NODE_ENV === "production"
        ? "https://api.jaswiki.com/"
        : "http://localhost:4040/";
Axios.defaults.withCredentials = true;

const App = ({ Component, pageProps }: AppProps) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [showing, setShowing] = useState(false);
    const { isCommonLoading } = useSelector(
        (state: RootState) => state.commonLoading
    );
    const router = useRouter();
    const dispatch = useDispatch();

    const onSearch = useCallback((v, e) => {
        router.push(`/search?q=${v}`);
    }, []);

    const onLogOut = useCallback(() => {
        dispatch(logoutRequest());
        router.push("/");
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", () =>
            window.scrollY > 100
                ? setShowing(() => true)
                : setShowing(() => false)
        );
    }, [process.browser && window?.scrollY]);

    const onScroll = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (user !== null && !user.token) {
            dispatch(getAuthRequest());
        }
    }, [router]);

    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <link rel="icon" type="image/png" href="/public/favicon.png" />
            </Head>
            <Wrapper>
                {isCommonLoading && (
                    <Loader>
                        <Spin indicator={antIcon} />
                    </Loader>
                )}
                <Nav
                    onLogOut={onLogOut}
                    onSearch={onSearch}
                    id={user?._id}
                    token={user?.token}
                />
                <Component {...pageProps} />
                {router.asPath === "/register" ||
                    router.asPath === "/login" || <Footer />}
                {isCommonLoading ||
                    (showing && (
                        <ArrowUp onClick={onScroll}>
                            <BsArrowUp size={30} color="#ffffff" />
                        </ArrowUp>
                    ))}
            </Wrapper>
        </ThemeProvider>
    );
};

export default wrapper.withRedux(App);
