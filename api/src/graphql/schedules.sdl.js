export const schema = gql`
  type Schedule {
    id: Int!
    title: String!
    date: DateTime!
    active: Boolean!
    createdAt: DateTime!
    SignUp: [SignUp]!
  }

  type Query {
    activeSchedule: Schedule @skipAuth
    schedules: [Schedule!]! @skipAuth
    schedule(id: Int!): Schedule @skipAuth
  }

  input CreateScheduleInput {
    title: String!
    date: DateTime!
    active: Boolean!
  }

  input UpdateScheduleInput {
    title: String
    date: DateTime
    active: Boolean
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput!): Schedule! @requireAuth
    updateSchedule(id: Int!, input: UpdateScheduleInput!): Schedule!
      @requireAuth
    deleteSchedule(id: Int!): Schedule! @requireAuth
  }
`
