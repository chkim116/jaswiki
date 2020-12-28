const setIcon = [
    {
        level: 1,
        levelIcon: "📜",
    },
    {
        level: 2,
        levelIcon: "📝",
    },
    {
        level: 3,
        levelIcon: "📘",
    },
    {
        level: 4,
        levelIcon: "📖",
    },
    {
        level: 5,
        levelIcon: "📚",
    },
    {
        level: 6,
        levelIcon: "🎓",
    },
    {
        level: 7,
        levelIcon: "🧞",
    },
];

export const levelIconChange = (userLevel: number) => {
    if (process.browser && userLevel) {
        const icon = setIcon.filter((grade) => grade.level === userLevel);
        return icon[0].levelIcon;
    }
};
