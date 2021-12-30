export const schema = gql`
  type SignUp {
    id: Int!
    order: Int!
    scheduleId: Int!
    userId: Int!
    schedule: Schedule!
    user: User!
    createdAt: DateTime!
  }
  type Schedule {
    id: Int!
    title: String!
    date: DateTime!
    createdAt: DateTime!
    SignUp: [SignUp]!
  }
  type User {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    subject: String
    email: String!
    name: String!
  }

  type Query {
    users: [User!]! @skipAuth
    schedules: [Schedule!]! @requireAuth
    signUps: [SignUp!]! @requireAuth
    signUp(id: Int!): SignUp @requireAuth
  }

  input CreateSignUpInput {
    order: Int!
    scheduleId: Int!
    userId: Int!
  }

  input UpdateSignUpInput {
    order: Int
    scheduleId: Int
    userId: Int
  }

  type Mutation {
    createSignUp(input: CreateSignUpInput!): SignUp! @requireAuth
    updateSignUp(id: Int!, input: UpdateSignUpInput!): SignUp! @requireAuth
    deleteSignUp(id: Int!): SignUp! @requireAuth
  }
`
