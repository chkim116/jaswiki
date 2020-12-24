import React, { useEffect } from "react";
import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";
import "../styles/global.css";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import { Container } from "../styles/commonStyles";
import Nav from "../components/layouts/Nav";
import Footer from "../components/layouts/Footer";
import { useRouter } from "next/dist/client/router";
// 페이지의 공통

const App = ({ Component }) => {
    const router = useRouter();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Nav />
                <Component />
                {router.asPath === "/register" ||
                    router.asPath === "/login" || <Footer />}
            </Container>
        </ThemeProvider>
    );
};

export default wrapper.withRedux(withReduxSaga(App));
