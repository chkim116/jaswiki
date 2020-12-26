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
import Axios from "axios";
// 페이지의 공통

const App = ({ Component, pageProps }: AppProps) => {
    const { isLogin } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    const onSearch = useCallback((v, e) => {
        router.push(`/search?q=${v}`);
    }, []);

    const onLogOut = useCallback(() => {
        dispatch(logoutRequest());
    }, []);

    useEffect(() => {
        const cookie = document.cookie;
        Axios.defaults.headers.Cookie = "";
        if (cookie) {
            Axios.defaults.headers.Cookie = cookie;
            dispatch(getAuthRequest());
            console.log("logged");
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <Nav
                    onLogOut={onLogOut}
                    isLogin={isLogin}
                    onSearch={onSearch}
                />
                <Component {...pageProps} />
                {router.asPath === "/register" ||
                    router.asPath === "/login" || <Footer />}
            </Wrapper>
        </ThemeProvider>
    );
};

export default wrapper.withRedux(withReduxSaga(App));
