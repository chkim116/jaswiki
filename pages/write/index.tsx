import React, { useCallback, useEffect, useRef, useState } from "react";
import WriteForm from "../../components/write/WriteForm";
import marked from "marked";
import { useInput } from "@cooksmelon/event";
import { useReplace } from "@cooksmelon/utils";
import { SelectValue } from "antd/lib/select";

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

    // 툴바가 이미지일시
    if (toolbar.includes("img")) {
        console.log("준비중입니다");
        return "";
    }

    // 툴바가 헤더일시
    if (toolbar.includes("#")) {
        const newText = `${startText} ${toolbar} ${curText}${restText}`;
        return newText;
    }

    // 툴바가 링크일시
    if (toolbar.includes("[]()")) {
        console.log(curText);
        if (curText === "") {
            const newText = `${startText}${toolbar}${restText}`;
            return newText;
        }
        const newText = `${startText}[](${curText})${restText}`;
        return newText;
    }

    // 툴바가 인라인 일시
    if (inline) {
        // 인라인인데, 선택한 텍스트가 없을 시
        if (curText === "") {
            const newText = `${startText}${toolbar}입력${toolbar}${restText}`;
            return newText;
        }
        // 인라인인데, 선택한 텍스트가 있을 때
        const newText = `${startText} ${toolbar}${curText}${toolbar} ${restText}`;
        return newText;
    } else {
        // 툴바가 리스트고, > 일때
        if (toolbar === "-" || toolbar.includes(">")) {
            const newText = `${startText}\n${toolbar} ${restText}`;
            return newText;
        }
        // 툴바가 이미지도, 헤더도, 인라인도 아닐시
        const newText = `${startText}\n${toolbar}\n${restText}`;
        return newText;
    }
};

const index = () => {
    const [text, setText] = useState<string>("");
    const [head, setHead] = useState<RegExpMatchArray | null>([]);
    const [previewText, setPreviewText] = useState<string>("");
    const [startText, setStartText] = useState<number>(0);
    const [endText, setEndText] = useState<number>(0);
    const [title, onChangeTitle] = useInput("");

    const editor = useRef<HTMLTextAreaElement>(null);
    // 에디터 입력시
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const edit = editor.current as HTMLTextAreaElement;
        setStartText(edit.selectionStart);
        setEndText(edit.selectionEnd);
        setText(e.target.value);
    };

    // 툴바버튼 클릭시 이벤트
    const onHeader = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { toolbar, lnline } = e.currentTarget.dataset;
        const newText = addMark(
            text,
            startText,
            endText,
            toolbar as string,
            lnline as string
        );
        setText(newText);
    };

    // 글자를 드래그했을 시 시작, 끝을 저장
    const onSelect = () => {
        const edit = editor.current as HTMLTextAreaElement;
        setStartText(edit.selectionStart);
        setEndText(edit.selectionEnd);
    };

    // 엔터키 이벤트
    const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13) {
            const edit = editor.current as HTMLTextAreaElement;
            setStartText(edit.selectionStart);
            setEndText(edit.selectionEnd);
        }
    };

    // 상하좌우 키보드 이벤트
    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (
            e.keyCode === 37 ||
            e.keyCode === 38 ||
            e.keyCode === 39 ||
            e.keyCode === 40
        ) {
            const edit = editor.current as HTMLTextAreaElement;
            setStartText(edit.selectionStart ? edit.selectionStart - 1 : 0);
            setEndText(edit.selectionEnd);
        }
    };

    // 스택 선택시
    const onStack = useCallback((v: SelectValue) => {
        console.log(v);
    }, []);

    // 적용되는 기술 스택
    const stackList = [
        {
            stackName: "HTML",
            type: 1,
        },
        {
            stackName: "CSS",
            type: 2,
        },
        {
            stackName: "JS",
            type: 3,
        },
        {
            stackName: "React",
            type: 4,
        },
        {
            stackName: "Next",
            type: 5,
        },
        {
            stackName: "Node.js",
            type: 6,
        },
        {
            stackName: "TS",
            type: 7,
        },
        {
            stackName: "JQuery",
            type: 0,
        },
    ];

    // 입력시 프리뷰로 볼 수 있게끔
    useEffect(() => {
        setPreviewText(marked(text ? text : ""));
    }, [text]);

    // 프리뷰텍스트가 업데이트 될 때마다 목차 목록 추가.
    useEffect(() => {
        const headReg = previewText.match(
            /<([h][1])[^>]*>[가-힣\w\s']+<\/\1>/g
        );

        setHead(headReg);
    }, [previewText]);

    return (
        <WriteForm
            // isEdit={isEdit}
            onStack={onStack}
            stackList={stackList}
            onChangeTitle={onChangeTitle}
            onChange={onChange}
            onHeader={onHeader}
            onSelect={onSelect}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            head={head}
            text={text}
            previewText={previewText}
            editor={editor}
            title={title}
        />
    );
};

export default index;
