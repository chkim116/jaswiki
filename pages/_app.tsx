import React, { useCallback, useEffect } from "react";
import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";
import "../styles/global.css";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import { Wrapper } from "../styles/commonStyles";
import Nav from "../components/layouts/Nav";
import Footer from "../components/layouts/Footer";
import { useRouter } from "next/dist/client/router";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { getAuthRequest, logoutRequest } from "../redux/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styled from "@emotion/styled";
import Axios from "axios";

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
Axios.defaults.baseURL = "http://localhost:4000/";
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
        router.push("/");
        dispatch(logoutRequest());
    }, []);

    useEffect(() => {
        dispatch(getAuthRequest());
    }, [router]);

    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
    return (
        <ThemeProvider theme={theme}>
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

export default wrapper.withRedux(withReduxSaga(App));
