export const scenarioData = {
  scenarios: [
    {
      name: "在教室",
      dialogues: [
        {
          chinese: "嗨,这个座位有人吗?",
          english: "Hi, is this seat taken",
          // first: {
          //   chinese: "嗨,这个座位有人吗?",
          //   english: "Hi, is this seat taken?",
          // },
          // second: {
          //   chinese: "不,请随意坐。",
          //   english: "No, please feel free to sit.",
          // },
        },
        {
          chinese: "不,请随意坐。",
          english: "No, please feel free to sit",
        },
        // Add more dialogues...
        //   first: {
        //     chinese: "谢谢。你是新学生吗？",
        //     english: "Thanks. Are you a new student?",
        //   },
        //   second: {
        //     chinese: "是的，我刚转学来。",
        //     english: "Yes, I just transferred here.",
        //   },
        // },
      ],
    },
    {
      name: "在餐厅",
      dialogues: [
        {
          first: {
            chinese: "请问有素食选择吗?",
            english: "Do you have any vegetarian options?",
          },
          second: {
            chinese: "是的,我们有蔬菜沙拉和蘑菇意面。",
            english: "Yes, we have a vegetable salad and mushroom pasta.",
          },
        },
      ],
    },
  ],
};
