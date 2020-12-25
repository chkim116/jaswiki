import React from "react";
import styled from "@emotion/styled";
import marked from "marked";

const WriteContainer = styled.div`
    width: 100%;
    display: flex;
`;

const EditorContainer = styled.div`
    min-height: 300px;
`;

const Toolbar = styled.div`
    width: 100%;
    display: flex;
`;

const Editor = styled.textarea`
    min-height: 300px;
    width: 100%;
    border: 1px solid #dbdbdb;
    padding: 10px;
    resize: none;
    outline: none;
`;

const Preview = styled.div`
    min-height: 300px;
    width: 300px;
    border: 1px solid #dbdbdb;
    padding: 10px;

    blockquote {
        border-left: 3px solid #333;
    }
`;

type Props = {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onHeader: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onClick: () => void;
    onKeyUp: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    text: string;
    previewText: string;
    editor: React.RefObject<HTMLTextAreaElement> | null;
};

const WriteForm = ({
    onChange,
    onHeader,
    onClick,
    onKeyUp,
    onKeyDown,
    text,
    previewText,
    editor,
}: Props) => {
    return (
        <WriteContainer>
            <EditorContainer>
                <Toolbar>
                    <button type="button" data-toolbar="#" onClick={onHeader}>
                        h1
                    </button>
                    <button type="button" data-toolbar="##" onClick={onHeader}>
                        h2
                    </button>
                    <button type="button" data-toolbar="###" onClick={onHeader}>
                        h3
                    </button>
                    <button
                        type="button"
                        data-toolbar="####"
                        onClick={onHeader}>
                        h4
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
                        I
                    </button>
                    <button
                        type="button"
                        data-toolbar="```"
                        data-lnline="true"
                        onClick={onHeader}>
                        code
                    </button>

                    <button type="button" data-toolbar="---" onClick={onHeader}>
                        br
                    </button>
                    <button type="button" data-toolbar=">" onClick={onHeader}>
                        pq
                    </button>
                    <button
                        type="button"
                        data-toolbar="[]()"
                        onClick={onHeader}>
                        link
                    </button>
                    <button type="button" data-toolbar="img" onClick={onHeader}>
                        img
                    </button>
                    <input type="file" accept="image/*" hidden />
                </Toolbar>
                <Editor
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onClick={onClick}
                    ref={editor}
                    value={text}
                    onChange={onChange}
                    suppressContentEditableWarning={true}
                    contentEditable="true"></Editor>
            </EditorContainer>
            <Preview
                dangerouslySetInnerHTML={{
                    __html: previewText,
                }}></Preview>
        </WriteContainer>
    );
};

export default WriteForm;
