import { message } from "antd";

export const alertErr = (text: string) => {
    return message.error(text);
};
