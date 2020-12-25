export type user = {
    id: string;
    userId: string;
    level: number;
    contribute: number;
    email: string;
    docs: string[];
};

export type doc = {
    id: string;
    title: string;
    description: string;
    content: string;
    createDate: string;
    recentDate: string;
    stack: number[];
    creator: { userId: string; level: number };
    recentCreator: { userId: string; level: number };
    contributer: string[];
};

export type SignPayload = {
    email?: string;
    userId: string;
    password: string;
};

export type WritePayload = {
    title: string;
    description: string;
    content: string;
    stack: number[];
    creator: { userId: string; level: number };
};
