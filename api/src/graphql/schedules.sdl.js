export const schema = gql`
  type Schedule {
    id: Int!
    title: String!
    schedule: DateTime!
    createdAt: DateTime!
  }

  type Query {
    schedules: [Schedule!]! @requireAuth
    schedule(id: Int!): Schedule @requireAuth
  }

  input CreateScheduleInput {
    title: String!
    schedule: DateTime!
  }

  input UpdateScheduleInput {
    title: String
    schedule: DateTime
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput!): Schedule! @requireAuth
    updateSchedule(id: Int!, input: UpdateScheduleInput!): Schedule!
      @requireAuth
    deleteSchedule(id: Int!): Schedule! @requireAuth
  }
`
