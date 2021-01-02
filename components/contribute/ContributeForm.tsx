import React, { Fragment } from "react";
import { doc } from "../../@types/type";
import DocsList from "../common/DocsList";
import styled from "@emotion/styled";
import { levelIconChange } from "../../lib/levelChange";
import { Title } from "../../styles/commonStyles";
import { Button } from "antd";
import Link from "next/link";

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 8px;
`;

const UserInfo = styled.div`
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    ul {
        display: grid;
        grid-template-columns: repeat(2, 300px);
        gap: 15px;
        justify-content: center;
        @media all and (max-width: ${(props) => props.theme.phone}) {
            grid-template-columns: repeat(1, 300px);
        }

        li {
            padding: 12px;
            display: flex;
            border: 1px solid ${(props) => props.theme.darkWhite};
            p {
                text-align: center;
                width: 100px;
                border-right: 2px solid ${(props) => props.theme.darkWhite};
                margin-right: 8px;
            }
        }
    }
`;

const ToLevelUp = styled.div`
    margin-bottom: 48px;
    width: 100%;
    text-align: center;
`;

const WriteContainer = styled.div`
    padding-bottom: 80px;
`;

type Props = {
    data: any;
};

const ContributeForm = ({ data }: Props) => {
    return (
        <Container>
            <Title>MyInfo</Title>
            <UserInfo>
                <ul>
                    <li>
                        <p>ID</p>
                        <div>{data.userId}</div>
                    </li>
                    <li>
                        <p>Email</p>
                        <div>{data.email}</div>
                    </li>
                    <li>
                        <p>Level</p>
                        <div>
                            lv.{data.level} {levelIconChange(data.level)}
                        </div>
                    </li>
                    <li>
                        <p>기여도</p>
                        <div>{data.contribute}점</div>
                    </li>
                </ul>
            </UserInfo>
            <ToLevelUp>
                <Link href="/tutorial">
                    <Button type="primary">레벨업이 궁금하세요?</Button>
                </Link>
            </ToLevelUp>
            <Title>MyDocs</Title>
            <WriteContainer>
                {data.docs?.map((doc: doc) => (
                    <Fragment key={doc._id}>
                        <DocsList doc={doc} contribute={true}></DocsList>
                    </Fragment>
                ))}
            </WriteContainer>
        </Container>
    );
};

export default ContributeForm;
