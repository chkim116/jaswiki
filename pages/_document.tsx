import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="google-site-verification"
                        content="OhponGmjKRh1k7EKMqyEMJiuYnT81RLjnFLfykRg1I8"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript></NextScript>
                </body>
            </Html>
        );
    }
}
