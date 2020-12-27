import React from "react";
import { Skeleton } from "antd";
import styled from "@emotion/styled";

const Wrapper = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
`;

const DocsSkeleton = () => {
    return (
        <Wrapper>
            <Skeleton active />
            <Skeleton active />
        </Wrapper>
    );
};

export default DocsSkeleton;
