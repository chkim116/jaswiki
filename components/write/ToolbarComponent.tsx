import React from "react";
import { FcAddImage, FcLink, FcList } from "react-icons/fc";
import { GrBlockQuote } from "react-icons/gr";
import { IoCodeWorkingOutline } from "react-icons/io5";
import { BsTypeItalic } from "react-icons/bs";
import styled from "@emotion/styled";

const Toolbar = styled.div`
    width: 100%;
    display: flex;
    border: 1px solid ${(props) => props.theme.darkWhite};
    border-bottom: none;
    padding: 7px 0;
    position: sticky;
    top: 0;
    button {
        &:nth-of-type(odd) {
            border-right: 1px solid ${(props) => props.theme.darkWhite};
            border-left: 1px solid ${(props) => props.theme.darkWhite};
        }
        font-weight: 700;
        line-height: 100%;
        padding: 3px 10px;
        height: 100%;

        &:hover {
            background: #fafbfc;
        }
    }
`;

type Props = {
    onHeader: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const ToolbarComponent = ({ onHeader }: Props) => {
    return (
        <Toolbar>
            <button type="button" data-toolbar="#" onClick={onHeader}>
                H1
            </button>
            <button type="button" data-toolbar="##" onClick={onHeader}>
                H2
            </button>
            <button type="button" data-toolbar="###" onClick={onHeader}>
                H3
            </button>
            <button type="button" data-toolbar="####" onClick={onHeader}>
                H4
            </button>

            <button
                type="button"
                data-toolbar="**"
                data-lnline="true"
                onClick={onHeader}>
                <strong>B</strong>
            </button>
            <button
                type="button"
                data-toolbar="_"
                data-lnline="true"
                onClick={onHeader}>
                <BsTypeItalic />
            </button>
            <button
                type="button"
                data-toolbar="```"
                data-lnline="true"
                onClick={onHeader}>
                <IoCodeWorkingOutline />
            </button>

            <button type="button" data-toolbar="---" onClick={onHeader}>
                ---
            </button>
            <button type="button" data-toolbar=">" onClick={onHeader}>
                <GrBlockQuote />
            </button>
            <button type="button" data-toolbar="-" onClick={onHeader}>
                <FcList />
            </button>
            <button type="button" data-toolbar="[]()" onClick={onHeader}>
                <FcLink />
            </button>
            <button type="button" data-toolbar="img" onClick={onHeader}>
                <FcAddImage />
            </button>
            <input type="file" accept="image/*" hidden />
        </Toolbar>
    );
};

export default ToolbarComponent;
