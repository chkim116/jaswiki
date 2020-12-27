import React, { useCallback, useEffect, useRef, useState } from "react";
import WriteForm from "../../components/write/WriteForm";
import marked from "marked";
import { useInput } from "@cooksmelon/event";
import { SelectValue } from "antd/lib/select";
import { useDispatch, useSelector } from "react-redux";
import { WriteRequest } from "../../redux/write";
import { RootState } from "../../redux";
import { usePush } from "../../hook";
import { loadRequest } from "../../redux/commonLoading";
import { message } from "antd";
import EmptyDataComponent from "../../components/common/EmptyData";

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
            // 만약 선택한 값이 없는데, 툴바가 ```라면 실행.
            const newText = `${startText}${
                toolbar === "```" ? `${toolbar}js ` : toolbar
            }입력${toolbar}${restText}`;
            return newText;
        }
        // 만약 툴바가 ```라면 js를 넣어 변환
        if (toolbar === "```") {
            const newText = `${startText} ${toolbar}js\n${curText}\n${toolbar} ${restText}`;
            return newText;
        }
        // 인라인인데, 선택한 텍스트가 있을 때
        const newText = `${startText} ${toolbar}${curText}${toolbar} ${restText}`;
        return newText;
    } else {
        // 툴바가 리스트고, > 일때
        if (toolbar === "-" || toolbar.includes(">")) {
            const newText = `${startText}${curText}\n${toolbar} ${restText}`;
            return newText;
        }
        // 툴바가 이미지도, 헤더도, 인라인도 아닐시
        const newText = `${startText}${curText}\n${toolbar}\n${restText}`;
        return newText;
    }
};
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

const index = () => {
    const [text, setText] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [stack, setStack] = useState<number[]>([]);
    const [startText, setStartText] = useState<number>(0);
    const [endText, setEndText] = useState<number>(0);
    const [title, onChangeTitle] = useInput("");
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const { user, isLogin } = useSelector((state: RootState) => state.auth);
    const { isDone, detailRouter } = useSelector(
        (state: RootState) => state.write
    );
    const editor = useRef<HTMLTextAreaElement>(null);
    const onChangeDesc = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDesc(e.target.value);
        },
        []
    );

    // 에디터 입력시
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const edit = editor.current as HTMLTextAreaElement;
            setStartText(edit.selectionStart);
            setEndText(edit.selectionEnd);
            setText(e.target.value);
        },
        []
    );

    // 툴바버튼 클릭시 이벤트
    const onHeader = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const { toolbar, lnline } = e.currentTarget.dataset;
            const newText = addMark(
                text,
                startText,
                endText,
                toolbar as string,
                lnline as string
            );
            setText(newText);
        },
        [text, startText, endText]
    );

    // 글자를 드래그했을 시 시작, 끝을 저장
    const onSelect = useCallback(() => {
        const edit = editor.current as HTMLTextAreaElement;
        setStartText(edit.selectionStart);
        setEndText(edit.selectionEnd);
    }, []);

    // 엔터키 이벤트
    const onKeyUp = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.keyCode === 13) {
                const edit = editor.current as HTMLTextAreaElement;
                setStartText(edit.selectionStart);
                setEndText(edit.selectionEnd);
            }
        },
        []
    );

    // 상하좌우 키보드 이벤트
    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
        },
        []
    );

    // 스택 선택시
    const onStack = useCallback(
        (v: SelectValue & any) => {
            setStack(() => v);
        },
        [stack]
    );

    // 제출 시 텍스트를 html로 파싱하여 제출합니다.
    const onSubmit = useCallback(() => {
        const submit = {
            title,
            description: desc,
            content: marked(text),
            creator: user._id,
            stack,
        };
        setIsSubmit(() => true);
        dispatch(WriteRequest(submit));
        dispatch(loadRequest());
    }, [text, title, desc, stack, user]);

    // 글작성완료시 디테일페이지로이동`
    usePush(isSubmit && isDone, `/docs/${detailRouter}`);
    return (
        <>
            {!isLogin ? (
                <EmptyDataComponent
                    description="회원만 문서 작성이 가능합니다."
                    route="/login"
                    routeName="로그인하기"
                />
            ) : (
                <WriteForm
                    // isEdit={isEdit}
                    onChangeDesc={onChangeDesc}
                    onStack={onStack}
                    onSubmit={onSubmit}
                    stackList={stackList}
                    onChangeTitle={onChangeTitle}
                    onChange={onChange}
                    onHeader={onHeader}
                    onSelect={onSelect}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    text={text}
                    editor={editor}
                    title={title}
                />
            )}
        </>
    );
};

export default index;
