import React from "react";
import { NextSeo } from "next-seo";
import image from "../../assets/banner.jpg";

type Props = {
    data: {
        title: string;
        url: string;
        desc: string;
        image?: string;
    };
};

const Seo = ({ data }: Props) => {
    return (
        <NextSeo
            title={data.title ? data.title : "자스위키 jaswiki"}
            description={
                data.desc
                    ? data.desc
                    : "자스위키는 자바스크립트 개발자들이 모여 만드는 인터넷 실전 예제 백과입니다."
            }
            canonical={`https://www.jaswiki.ie/${data.url && data.url}`}
            openGraph={{
                url: `https://www.jaswiki.ie/${data.url && data.url}`,
                title: data.title ? data.title : "자스위키 jaswiki",
                description: data.desc
                    ? data.desc
                    : "자스위키는 자바스크립트 개발자들이 모여 만드는 인터넷 실전 예제 백과입니다.",
                images: [
                    {
                        url: data.image ? data.image : image,
                        width: 800,
                        height: 600,
                        alt: "javascript wikipedia",
                    },
                ],
                site_name: "jaswiki",
            }}
        />
    );
};

export default Seo;
