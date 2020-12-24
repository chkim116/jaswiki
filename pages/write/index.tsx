import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import marked from "marked";

const Container = styled.div`
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

const addMark = (text, start, end, toolbar, inline) => {
    const startText = text.slice(0, start);
    const curText = text.slice(start, end);
    const restText = text.slice(end, text.length);

    if (toolbar.includes("img")) {
        console.log("준비중입니다");
        return;
    }

    if (toolbar.includes("#")) {
        const newText = `${startText} ${toolbar} ${curText}${restText}`;
        return newText;
    }

    if (inline) {
        if (curText === "") {
            const newText = `${startText}${toolbar}입력${toolbar}${restText}`;
            return newText;
        }
        const newText = `${startText} ${toolbar}${curText}${toolbar} ${restText}`;
        return newText;
    } else {
        const newText = `${startText}\n${toolbar}\n${restText}`;
        return newText;
    }
};

const index = () => {
    const [text, setText] = useState<string>("");
    const [previewText, setPreviewText] = useState<string>("");
    const [startText, setStartText] = useState<number>(0);
    const [endText, setEndText] = useState<number>(0);

    const editor = useRef(null);

    const onChange = (e) => {
        const edit = editor.current;
        setStartText(edit.selectionStart);
        setEndText(edit.selectionEnd);
        setText(e.target.value);
    };

    const onHeader = (e) => {
        const { toolbar, lnline } = e.currentTarget.dataset;
        const newText = addMark(text, startText, endText, toolbar, lnline);
        setText(newText);
        editor.current.focus();
    };

    const onClick = () => {
        const edit = editor.current;
        setStartText(edit.selectionStart);
        setEndText(edit.selectionEnd);
    };

    const onKeyUp = (e) => {
        if (e.keyCode === 13) {
            const edit = editor.current;
            setStartText(edit.selectionStart);
            setEndText(edit.selectionEnd);
        }
    };

    const onKeyDown = (e) => {
        if (
            e.keyCode === 37 ||
            e.keyCode === 38 ||
            e.keyCode === 39 ||
            e.keyCode === 40
        ) {
            const edit = editor.current;
            setStartText(edit.selectionStart - 1);
            setEndText(edit.selectionEnd);
        }
    };

    useEffect(() => {
        setPreviewText(marked(text ? text : ""));
    }, [text]);

    return (
        <Container>
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
        </Container>
    );
};

export default index;
