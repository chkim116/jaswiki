import styled from "@emotion/styled";
import Link from "antd/lib/typography/Link";
import React from "react";
import { doc } from "../../@types/type";
import { levelIconChange } from "../../lib/levelChange";

const DocsListContent = styled.div`
    padding: 5px;
    max-width: 1200px;
    margin: 12px auto;

    a {
        color: ${(props) => props.theme.link};
        font-weight: 600;
        font-size: ${(props) => props.theme.ls};
    }
    p {
        margin: 8px 0;
    }

    span {
        font-weight: 600;
    }
`;

const DocsList = ({ doc, contribute }: { doc: doc; contribute?: boolean }) => {
    return (
        <DocsListContent>
            <Link href={`/docs/${doc._id}`}>
                <a>{doc.title}</a>
            </Link>
            <div>
                <p>{doc.description}</p>
                {contribute || (
                    <span>
                        {levelIconChange(doc.creator.level)}{" "}
                        {doc.creator.userId}
                    </span>
                )}
            </div>
        </DocsListContent>
    );
};

export default DocsList;
