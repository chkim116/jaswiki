import React, { useCallback, useRef, useState } from "react";
import styled from "@emotion/styled";
import { ContentDetail } from "../common/DocsDetailComponent";
import { Select } from "antd";
import { SelectValue } from "antd/lib/select";
const { Option } = Select;
import ToolbarComponent from "./ToolbarComponent";
import { useInput } from "@cooksmelon/event";
import { useDispatch, useSelector } from "react-redux";
import { loadRequest } from "../../redux/commonLoading";
import { updateRequest, WriteRequest } from "../../redux/write";
import { usePush } from "../../hook";
import { RootState } from "../../redux";
import { doc } from "../../@types/type";
import { addMark, stackList } from "../../lib";
import marked from "marked";

const WriteContainer = styled.div`
    width: 100%;
    max-width: 1400px;
    margin: 36px auto;
    padding: 0 3px;
    display: flex;
    justify-content: center;
`;

const EditorContainer = styled.div`
    min-height: 600px;
    width: 55%;
    input {
        all: unset;
        font-size: ${(props) => props.theme.xls};
        font-weight: 600;
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
    isEdit?: boolean;
    doc?: doc;
    route?: string;
};

const WriteForm = ({ isEdit, doc, route }: Props) => {
    const [text, setText] = useState<string>(doc?.content ? doc.content : "");
    const [desc, setDesc] = useState<string>(
        doc?.description ? doc.description : ""
    );
    const [stack, setStack] = useState<number[]>(doc?.stack ? doc.stack : []);
    const [startText, setStartText] = useState<number>(0);
    const [endText, setEndText] = useState<number>(0);
    const [isSubmit, setIsSubmit] = useState(false);
    const [title, onChangeTitle] = useInput(doc?.title ? doc.title : "");
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
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
            content: text,
            creator: user._id,
            stack,
        };
        setIsSubmit(() => true);
        if (!isEdit) {
            dispatch(WriteRequest(submit));
        } else {
            dispatch(updateRequest({ ...submit, id: route }));
        }
        dispatch(loadRequest());
    }, [text, title, desc, stack, user, detailRouter]);

    // 글작성완료시 디테일페이지로이동`
    if (!isEdit) {
        usePush(isSubmit && isDone, `/docs/${detailRouter}`);
    } else {
        usePush(isEdit && isDone && isSubmit, `/docs/${route}`);
    }

    return (
        <>
            <WriteContainer>
                <EditorContainer>
                    <input
                        onChange={onChangeTitle}
                        type="text"
                        value={title}
                        placeholder="문서의 제목을 입력하세요."
                    />
                    <Description
                        value={desc}
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
                            <Option value={stack.value} label={stack.label}>
                                <div>
                                    <span role="img" aria-label={stack.label}>
                                        {stack.label}
                                    </span>
                                </div>
                            </Option>
                        ))}
                    </SelectStack>
                </EditorContainer>

                <Preview className="editor__container">
                    <h1>{title ? title : "문서 제목을 입력바랍니다."}</h1>
                    <ContentDetail
                        dangerouslySetInnerHTML={{
                            __html: marked(text),
                        }}></ContentDetail>
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
