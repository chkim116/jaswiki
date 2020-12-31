import React, { Fragment } from "react";
import {
    SiCss3,
    SiHtml5,
    SiJavascript,
    SiJquery,
    SiNextDotJs,
    SiNodeDotJs,
    SiReact,
    SiTypescript,
} from "react-icons/si";

const icon = (size: number) => [
    {
        component: <SiJquery size={size} data-type="0" fill="#f1d900" />,
        type: 0,
    },
    {
        component: <SiHtml5 size={size} data-type="1" fill="#E44F26" />,
        type: 1,
    },
    {
        component: <SiCss3 size={size} data-type="2" fill="#007ACC" />,
        type: 2,
    },
    {
        component: <SiJavascript data-type="3" fill="#FBE574" size={size} />,
        type: 3,
    },
    {
        component: <SiReact data-type="4" fill="blue" size={size} />,
        type: 4,
    },
    {
        component: <SiNextDotJs size={size} data-type="5" fill="#000000" />,
        type: 5,
    },
    {
        component: <SiNodeDotJs size={size} data-type="7" fill="#9EC879" />,
        type: 6,
    },
    {
        component: <SiTypescript size={size} data-type="6" fill="#007ACC" />,
        type: 7,
    },
];

const StackComponent = ({
    stack,
    size = 24,
}: {
    stack: number[];
    size?: number;
}) => {
    const icons = icon(size).filter((icon) => stack.includes(icon.type));
    return (
        <span>
            {icons.map((list) => (
                <Fragment key={list.type}> {list.component} </Fragment>
            ))}
        </span>
    );
};

export default StackComponent;
