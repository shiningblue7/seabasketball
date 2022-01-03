export const schema = gql`
  type User {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    subject: String
    email: String!
    name: String!
    SignUp: [SignUp]!
    roles: String
    member: Boolean
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: Int!): User @skipAuth
  }

  input CreateUserInput {
    subject: String
    email: String!
    name: String!
    roles: String
    member: Boolean
  }

  input UpdateUserInput {
    subject: String
    email: String
    name: String
    roles: String
    member: Boolean
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
