import {
  signUps,
  signUp,
  createSignUp,
  updateSignUp,
  deleteSignUp,
} from './signUps'

describe('signUps', () => {
  scenario('returns all signUps', async (scenario) => {
    const result = await signUps()

    expect(result.length).toEqual(Object.keys(scenario.signUp).length)
  })

  scenario('returns a single signUp', async (scenario) => {
    const result = await signUp({ id: scenario.signUp.one.id })

    expect(result).toEqual(scenario.signUp.one)
  })

  scenario('creates a signUp', async (scenario) => {
    const result = await createSignUp({
      input: {
        order: 6556143,
        scheduleId: scenario.signUp.two.scheduleId,
        userId: scenario.signUp.two.userId,
      },
    })

    expect(result.order).toEqual(6556143)
    expect(result.scheduleId).toEqual(scenario.signUp.two.scheduleId)
    expect(result.userId).toEqual(scenario.signUp.two.userId)
  })

  scenario('updates a signUp', async (scenario) => {
    const original = await signUp({ id: scenario.signUp.one.id })
    const result = await updateSignUp({
      id: original.id,
      input: { order: 2049015 },
    })

    expect(result.order).toEqual(2049015)
  })

  scenario('deletes a signUp', async (scenario) => {
    const original = await deleteSignUp({ id: scenario.signUp.one.id })
    const result = await signUp({ id: original.id })

    expect(result).toEqual(null)
  })
})
