import styled from "@emotion/styled";

export const Wrapper = styled.main`
    width: 100%;
`;

export const Title = styled.h1`
    margin: 20px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid ${(props) => props.theme.darkWhite};
`;

export const DetailTitle = styled.h1`
    position: relative;
    padding-bottom: 12px;
    &:after {
        width: 30px;
        height: 1px;
        content: "";
        position: absolute;
        bottom: 0px;
        left: 0;
        border-bottom: 2px solid ${(props) => props.theme.darkWhite};
    }
`;
