import React, { useEffect, useRef, useState } from "react";
import WriteForm from "../../components/write/WriteForm";
import marked from "marked";

const addMark = (
    text: string,
    start: number,
    end: number,
    toolbar: string,
    inline: string
): string => {
    const startText = text.slice(0, start);
    const curText = text.slice(start, end);
    const restText = text.slice(end, text.length);

    if (toolbar.includes("img")) {
        console.log("준비중입니다");
        return "";
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

    const editor = useRef<HTMLTextAreaElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const edit = editor.current as HTMLTextAreaElement;
        setStartText(edit.selectionStart);
        setEndText(edit.selectionEnd);
        setText(e.target.value);
    };

    const onHeader = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const edit = editor.current as HTMLTextAreaElement;
        const { toolbar, lnline } = e.currentTarget.dataset;
        const newText = addMark(
            text,
            startText,
            endText,
            toolbar as string,
            lnline as string
        );
        setText(newText);
        edit.focus();
    };

    const onClick = () => {
        const edit = editor.current as HTMLTextAreaElement;
        setStartText(edit.selectionStart);
        setEndText(edit.selectionEnd);
    };

    const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13) {
            const edit = editor.current as HTMLTextAreaElement;
            setStartText(edit.selectionStart);
            setEndText(edit.selectionEnd);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (
            e.keyCode === 37 ||
            e.keyCode === 38 ||
            e.keyCode === 39 ||
            e.keyCode === 40
        ) {
            const edit = editor.current as HTMLTextAreaElement;
            setStartText(edit.selectionStart - 1);
            setEndText(edit.selectionEnd);
        }
    };

    useEffect(() => {
        setPreviewText(marked(text ? text : ""));
    }, [text]);

    return (
        <WriteForm
            onChange={onChange}
            onHeader={onHeader}
            onClick={onClick}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            text={text}
            previewText={previewText}
            editor={editor}
        />
    );
};

export default index;
