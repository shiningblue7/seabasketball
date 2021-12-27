import { users, user, createUser, updateUser, deleteUser } from './users'

describe('users', () => {
  scenario('returns all users', async (scenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async () => {
    const result = await createUser({
      input: { updatedAt: '2021-12-27T07:07:19Z', email: 'String2872194' },
    })

    expect(result.updatedAt).toEqual('2021-12-27T07:07:19Z')
    expect(result.email).toEqual('String2872194')
  })

  scenario('updates a user', async (scenario) => {
    const original = await user({ id: scenario.user.one.id })
    const result = await updateUser({
      id: original.id,
      input: { updatedAt: '2021-12-28T07:07:19Z' },
    })

    expect(result.updatedAt).toEqual('2021-12-28T07:07:19Z')
  })

  scenario('deletes a user', async (scenario) => {
    const original = await deleteUser({ id: scenario.user.one.id })
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
