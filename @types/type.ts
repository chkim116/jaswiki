export type user = {
    id: string;
    userId: string;
    level: number;
    contribute: number;
    email: string;
    docs: string[];
};

export type doc = {
    _id: string;
    title: string;
    description: string;
    content: string;
    createDate: string;
    recentUpdate: string;
    stack: number[];
    creator: { userId: string; level: number; id: string };
    recentCreator: { userId: string; level: number; id: string };
    contributer: [{ userId: string; level: number; id: string }];
};

export type SignPayload = {
    email?: string;
    userId: string;
    password: string;
};

export type WritePayload = {
    id?: string;
    title: string;
    description: string;
    content: string;
    stack: number[];
    creator: { userId: string; level: number };
};
