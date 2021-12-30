export const schema = gql`
  type Schedule {
    id: Int!
    title: String!
    date: DateTime!
    createdAt: DateTime!
    SignUp: [SignUp]!
  }

  type Query {
    schedules: [Schedule!]! @skipAuth
    schedule(id: Int!): Schedule @skipAuth
  }

  input CreateScheduleInput {
    title: String!
    date: DateTime!
  }

  input UpdateScheduleInput {
    title: String
    date: DateTime
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput!): Schedule! @requireAuth
    updateSchedule(id: Int!, input: UpdateScheduleInput!): Schedule!
      @requireAuth
    deleteSchedule(id: Int!): Schedule! @requireAuth
  }
`
