import React from "react";
import styled from "@emotion/styled";
import { ContentDetail } from "../common/DocsDetailComponent";
import { Select } from "antd";
import { SelectValue } from "antd/lib/select";
const { Option } = Select;
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ToolbarComponent from "./ToolbarComponent";

const WriteContainer = styled.div`
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 36px auto;
    display: flex;
    justify-content: center;
`;

const EditorContainer = styled.div`
    min-height: 600px;
    width: 55%;

    input {
        all: unset;
        font-size: ${(props) => props.theme.xls};
        width: 100%;
        padding: 8px 3px;
    }
    @media all and (max-width: ${(props) => props.theme.desktop}) {
        width: 100%;
        margin: 3px;
    }
`;

const Description = styled.textarea`
    width: 100%;
    border: 1px solid ${(props) => props.theme.darkWhite};
    padding: 10px;
    resize: none;
    outline: none;
`;

const Editor = styled.textarea`
    min-height: 600px;
    width: 100%;
    border: 1px solid ${(props) => props.theme.darkWhite};
    padding: 10px;
    resize: none;
    outline: none;
`;

const Preview = styled.div`
    overflow: auto;
    margin-left: 3px;
    ::-webkit-scrollbar {
        width: 5.2px;
    }
    ::-webkit-scrollbar-track {
        background-color: ${(props) => props.theme.white};
    }

    ::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.darkWhite};
        border-radius: 10px;
    }
    & > h1 {
        padding-bottom: 6px;
        margin-bottom: 6px;
        border-bottom: 1px solid ${(props) => props.theme.darkWhite};
    }
    width: 45%;
    max-height: 990px;
    min-height: 600px;
    border: 1px solid #dbdbdb;
    padding: 10px;
    @media all and (max-width: ${(props) => props.theme.desktop}) {
        display: none;
    }
`;

const DocsBtn = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 36px;
    button {
        width: 150px;
        text-align: center;
        background-color: ${(props) => props.theme.green};
        padding: 8px;
        color: ${(props) => props.theme.white};
        border-radius: 8px;
    }
`;

const SelectStack = styled(Select)`
    width: 100%;
    & > div {
    }
`;

type Props = {
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDesc: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onHeader: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onSelect: () => void;
    onStack: (value: SelectValue) => void;
    onKeyUp: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    text: string;
    editor: React.RefObject<HTMLTextAreaElement> | null;
    title: string | number;
    stackList: { stackName: string; type: number }[];
    isEdit?: boolean;
};

const renderers = {
    code: ({ language, value }: { language: string; value: string }) => {
        return value === undefined ? (
            <> </>
        ) : (
            <SyntaxHighlighter
                children={value}
                language={language}></SyntaxHighlighter>
        );
    },
};

const WriteForm = ({
    onChangeTitle,
    onChangeDesc,
    onChange,
    onHeader,
    onSelect,
    onSubmit,
    onKeyUp,
    onKeyDown,
    text,
    editor,
    title,
    stackList,
    onStack,
    isEdit,
}: Props) => {
    return (
        <>
            <WriteContainer>
                <EditorContainer>
                    <input
                        onChange={onChangeTitle}
                        type="text"
                        placeholder="문서의 제목을 입력하세요."
                    />
                    <Description
                        onChange={onChangeDesc}
                        placeholder="문서의 설명을 입력하세요."></Description>
                    <ToolbarComponent onHeader={onHeader} />
                    <Editor
                        id="editor"
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                        onSelect={onSelect}
                        ref={editor}
                        value={text}
                        onChange={onChange}
                        suppressContentEditableWarning={true}
                        contentEditable="true"></Editor>
                    <SelectStack
                        mode="multiple"
                        placeholder="Stack"
                        onChange={onStack}
                        optionLabelProp="label">
                        {stackList.map((stack) => (
                            <Option value={stack.type} label={stack.stackName}>
                                <div>
                                    <span
                                        role="img"
                                        aria-label={stack.stackName}>
                                        {stack.stackName}
                                    </span>
                                </div>
                            </Option>
                        ))}
                    </SelectStack>
                </EditorContainer>

                <Preview className="editor__container">
                    <h1>{title ? title : "문서 제목을 입력바랍니다."}</h1>
                    <ContentDetail>
                        <ReactMarkdown renderers={renderers}>
                            {text}
                        </ReactMarkdown>
                    </ContentDetail>
                </Preview>
            </WriteContainer>

            <DocsBtn>
                <button type="submit" onClick={onSubmit}>
                    문서 등록
                </button>
            </DocsBtn>
        </>
    );
};

export default WriteForm;
