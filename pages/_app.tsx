import React, { useCallback, useEffect } from "react";
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

// 페이지의 공통
Axios.defaults.baseURL =
    process.env.NODE_ENV === "production"
        ? "https://jaswikib.ml/"
        : "http://localhost:4040/";
Axios.defaults.withCredentials = true;

const App = ({ Component, pageProps }: AppProps) => {
    const { isLogin, user } = useSelector((state: RootState) => state.auth);
    const { isCommonLoading } = useSelector(
        (state: RootState) => state.commonLoading
    );
    const router = useRouter();
    const dispatch = useDispatch();

    const onSearch = useCallback((v, e) => {
        router.push(`/search?q=${v}`);
    }, []);

    const onLogOut = useCallback(() => {
        document.cookie = `x_auth=; max-age=0; path=/; domain=jaswiki.com; secure; httpOnly`;
        router.push("/");
        dispatch(logoutRequest());
    }, []);

    useEffect(() => {
        dispatch(getAuthRequest());
    }, [router]);

    useEffect(() => {
        if (user.token) {
            document.cookie = `x_auth=${user.token}; max-age=604800; path=/; domain=jaswiki.com; secure; httpOnly`;
        }
    }, [user?.token]);

    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="../images/favicon-16x16.png"
                />
            </Head>
            <Wrapper>
                {isCommonLoading && (
                    <Loader>
                        <Spin indicator={antIcon} />
                    </Loader>
                )}
                <Nav
                    onLogOut={onLogOut}
                    isLogin={isLogin}
                    onSearch={onSearch}
                    id={user?._id}
                />
                <Component {...pageProps} />
                {router.asPath === "/register" ||
                    router.asPath === "/login" || <Footer />}
            </Wrapper>
        </ThemeProvider>
    );
};

export default wrapper.withRedux(App);
