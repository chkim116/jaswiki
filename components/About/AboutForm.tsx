import React from "react";
import styled from "@emotion/styled";
import { Title } from "../../styles/commonStyles";
import DocsDetailComponent from "../common/DocsDetailComponent";

const AboutCotainer = styled.div`
    min-height: 100vh;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    @media all and (max-width: ${(props) => props.theme.desktop}) {
        padding: 5px;
    }
`;

const AboutForm = () => {
    return (
        <AboutCotainer>
            <div>
                <Title>
                    자스위키
                    <span>🔐</span>
                </Title>
            </div>
            <DocsDetailComponent content="content" description="desc" />
        </AboutCotainer>
    );
};

export default AboutForm;
