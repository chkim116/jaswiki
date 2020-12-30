import React from "react";
import dynamic from "next/dynamic";
const TutorialForm = dynamic(
    () => import("../../components/tutorial/TutorialForm")
);

const tutorial = () => {
    return <TutorialForm></TutorialForm>;
};

export default tutorial;
