export const standard = defineScenario({
  signUp: {
    one: {
      data: {
        order: 7866495,
        schedule: {
          create: { title: 'String', schedule: '2021-12-27T19:08:43Z' },
        },

        user: {
          create: { updatedAt: '2021-12-27T19:08:43Z', email: 'String141573' },
        },
      },
    },

    two: {
      data: {
        order: 1109503,
        schedule: {
          create: { title: 'String', schedule: '2021-12-27T19:08:43Z' },
        },

        user: {
          create: { updatedAt: '2021-12-27T19:08:43Z', email: 'String2571234' },
        },
      },
    },
  },
})
