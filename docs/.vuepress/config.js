module.exports = {
    title: "Tricky Pi",
    base: "/",
    description: "day day up",
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        lastUpdated: "更新日期",
        nav: [
            {
                text: "笔记",
                items: [
                    { text: "Js", link: "/Note/Js/Promise" },
                    { text: "Http", link: "/Note/Http/Overview" },
                    { text: "Node", link: "/Note/Node/sharp" },
                    { text: "Vue2", link: "/Note/Vue2/Overview" },
                    { text: "Vue3", link: "/Note/Vue3/Overview" },
                    { text: "webpack", link: "/Note/webpack/Overview" },
                    { text: "Ops", link: "/Note/Ops/ssh" }
                ]
            },
            { text: "算法", link: "/Algorithm/BubbleSort" },
            { text: "柴米油盐", link: "/Dayday/20200303" }
            // { text: '诗与远方', link: '/Poetry/' }
        ],
        sidebar: {
            "/Note/Js/": ["Promise", "heap&stack"],
            "/Note/Http/": ["Overview"],
            "/Note/Node/": ["sharp"],
            "/Note/Vue2/": [
                "Overview",
                "NextTick",
                "Live",
                "Vmodel",
                "Watch&Computed"
            ],
            "/Note/Vue3/": ["Overview"],
            "/Note/webpack/": ["Overview"],
            "/Note/Ops/": ["ssh"],
            "/Algorithm/": ["BubbleSort", "QuickySort"],
            "/Dayday/": [
                "20200303",
                "20200505",
                "20200506",
                "20200927",
                "20200928",
                "20200929",
                "20200930",
                "20201001",
                "20201002"
            ],
            "/Poetry/": []
        }
    }
};
