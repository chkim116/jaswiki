import "@emotion/react";

declare module "@emotion/react" {
    export interface Theme {
        maxWidth: string;
        black: string;
        white: string;
        green: string;
        darkWhite: string;
        link: string;
        blue: string;
        ss: string;
        ms: string;
        ls: string;
        xls: string;
        desktop: string;
        phone: string;
    }
}

// You are also able to use a 3rd party theme this way:
