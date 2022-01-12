export const schema = gql`
  type SignUp {
    id: Int!
    scheduleId: Int!
    userId: Int!
    schedule: Schedule!
    user: User!
    createdAt: DateTime!
  }

  type Query {
    activeSignups: [SignUp!]! @skipAuth
    signUps: [SignUp!]! @requireAuth
    signUp(id: Int!): SignUp @requireAuth
  }

  input CreateSignUpInput {
    scheduleId: Int!
    userId: Int!
  }

  input UpdateSignUpInput {
    scheduleId: Int
    userId: Int
  }

  type Mutation {
    swapSignupPositions(id1: Int!, id2: Int!): [SignUp]! @requireAuth
    createSignUp(input: CreateSignUpInput!): SignUp! @requireAuth
    updateSignUp(id: Int!, input: UpdateSignUpInput!): SignUp! @requireAuth
    deleteSignUp(id: Int!): SignUp! @requireAuth
  }
`
