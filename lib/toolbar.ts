export const addMark = (
    text: string,
    start: number,
    end: number,
    toolbar: string,
    inline: string,
    img?: string
): string => {
    const startText = text.slice(0, start);
    const curText = text.slice(start, end);
    const restText = text.slice(end, text.length);

    if (toolbar === "img") {
        console.log(img);
        const newText = `${startText}\n![](${img})\n${curText}${restText}`;
        return newText;
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
            const newText = `${startText}${toolbar}js\n${curText}\n${toolbar}${restText}`;
            return newText;
        }
        // 인라인인데, 선택한 텍스트가 있을 때
        const newText = `${startText} ${toolbar}${curText}${toolbar} ${restText}`;
        return newText;
    } else {
        // 툴바가 리스트고, > 일때
        if (toolbar === "-" || toolbar.includes(">")) {
            if (curText) {
                const newText = `${startText}\n${toolbar} ${curText}\n${restText}`;
                return newText;
            }

            const newText = `${startText}\n${toolbar}\n${restText}`;
            return newText;
        }
        // 툴바가 이미지도, 헤더도, 인라인도 아닐시
        const newText = `${startText}${curText}\n${toolbar}\n${restText}`;
        return newText;
    }
};
