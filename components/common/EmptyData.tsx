import React from "react";
import { Empty, Button } from "antd";
import styled from "@emotion/styled";
import Link from "next/link";

const EmptyData = styled(Empty)`
    margin: 100px 0;
    p {
        font-size: ${(props) => props.theme.ss};
    }
    button {
        color: ${(props) => props.theme.white};
    }
`;

const EmptyDataComponent = ({
    description,
    route,
    routeName,
}: {
    description: string;
    route?: string;
    routeName?: string;
}) => {
    return (
        <EmptyData
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
                height: 60,
            }}
            description={<span>{description}</span>}>
            {route && (
                <Link href={route}>
                    <Button type="primary">{routeName}</Button>
                </Link>
            )}
        </EmptyData>
    );
};

export default EmptyDataComponent;
