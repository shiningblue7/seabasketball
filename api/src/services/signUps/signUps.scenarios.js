export const standard = defineScenario({
  signUp: {
    one: {
      data: {
        schedule: { create: { title: 'String', date: '2021-12-30T07:40:49Z' } },
        user: {
          create: { updatedAt: '2021-12-30T07:40:49Z', email: 'String3603464' },
        },
      },
    },

    two: {
      data: {
        schedule: { create: { title: 'String', date: '2021-12-30T07:40:49Z' } },
        user: {
          create: { updatedAt: '2021-12-30T07:40:49Z', email: 'String9664911' },
        },
      },
    },
  },
})
