export const schema = gql`
  type AutoCreate {
    id: Int!
    enabled: Boolean
    scheduledAt: DateTime!
    autoCreateAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    autoCreates: [AutoCreate!]! @requireAuth
    autoCreate(id: Int!): AutoCreate @requireAuth
  }

  input CreateAutoCreateInput {
    enabled: Boolean
    scheduledAt: DateTime!
    autoCreateAt: DateTime!
  }

  input UpdateAutoCreateInput {
    enabled: Boolean
    scheduledAt: DateTime
    autoCreateAt: DateTime
  }

  type Mutation {
    createAutoCreate(input: CreateAutoCreateInput!): AutoCreate! @requireAuth
    updateAutoCreate(id: Int!, input: UpdateAutoCreateInput!): AutoCreate!
      @requireAuth
    deleteAutoCreate(id: Int!): AutoCreate! @requireAuth
  }
`
