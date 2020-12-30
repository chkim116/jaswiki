import React from "react";
import dynamic from "next/dynamic";
const AboutForm = dynamic(() => import("../../components/About/AboutForm"));

const about = () => {
    return <AboutForm></AboutForm>;
};

export default about;
