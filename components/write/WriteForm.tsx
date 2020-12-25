import React from "react";
import styled from "@emotion/styled";
import { FcAddImage, FcLink, FcList } from "react-icons/fc";
import { GrBlockQuote } from "react-icons/gr";
import { IoCodeWorkingOutline } from "react-icons/io5";
import { BsTypeItalic } from "react-icons/bs";
import { ContentDetail, LinkTitle } from "../common/DocsDetailComponent";
import { Anchor } from "antd";
import { useReplace } from "@cooksmelon/utils";
import { Select } from "antd";
import { SelectValue } from "antd/lib/select";
const { Option } = Select;

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

const BookAnchor = styled(Anchor)`
    margin-bottom: 36px;
    width: 100%;
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
    max-height: 690px;
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
        background-color: ${(props) => props.theme.green};
        padding: 8px 12px;
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
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onHeader: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onSelect: () => void;
    onStack: (value: SelectValue) => void;
    onKeyUp: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    text: string;
    previewText: string;
    editor: React.RefObject<HTMLTextAreaElement> | null;
    title: string | number;
    head: RegExpMatchArray | null;
    stackList: { stackName: string; type: number }[];
    isEdit?: boolean;
};

const WriteForm = ({
    onChangeTitle,
    onChange,
    onHeader,
    onSelect,
    onKeyUp,
    onKeyDown,
    text,
    previewText,
    editor,
    title,
    head,
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
                    <Toolbar>
                        <button
                            type="button"
                            data-toolbar="#"
                            onClick={onHeader}>
                            H1
                        </button>
                        <button
                            type="button"
                            data-toolbar="##"
                            onClick={onHeader}>
                            H2
                        </button>
                        <button
                            type="button"
                            data-toolbar="###"
                            onClick={onHeader}>
                            H3
                        </button>
                        <button
                            type="button"
                            data-toolbar="####"
                            onClick={onHeader}>
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

                        <button
                            type="button"
                            data-toolbar="---"
                            onClick={onHeader}>
                            ---
                        </button>
                        <button
                            type="button"
                            data-toolbar=">"
                            onClick={onHeader}>
                            <GrBlockQuote />
                        </button>
                        <button
                            type="button"
                            data-toolbar="-"
                            onClick={onHeader}>
                            <FcList />
                        </button>
                        <button
                            type="button"
                            data-toolbar="[]()"
                            onClick={onHeader}>
                            <FcLink />
                        </button>
                        <button
                            type="button"
                            data-toolbar="img"
                            onClick={onHeader}>
                            <FcAddImage />
                        </button>
                        <input type="file" accept="image/*" hidden />
                    </Toolbar>
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

                    {head && (
                        <BookAnchor affix={false}>
                            <LinkTitle>목차</LinkTitle>
                            {head.map((word) => (
                                <Anchor.Link
                                    key={word}
                                    href={`#${useReplace(word)}`}
                                    title={useReplace(word)}></Anchor.Link>
                            ))}
                        </BookAnchor>
                    )}
                    <ContentDetail
                        dangerouslySetInnerHTML={{
                            __html: previewText,
                        }}></ContentDetail>
                </Preview>
            </WriteContainer>

            <DocsBtn>
                <button type="submit">문서 등록</button>
            </DocsBtn>
        </>
    );
};

export default WriteForm;
