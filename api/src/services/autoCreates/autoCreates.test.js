import {
  autoCreates,
  autoCreate,
  createAutoCreate,
  updateAutoCreate,
  deleteAutoCreate,
} from './autoCreates'

describe('autoCreates', () => {
  scenario('returns all autoCreates', async (scenario) => {
    const result = await autoCreates()

    expect(result.length).toEqual(Object.keys(scenario.autoCreate).length)
  })

  scenario('returns a single autoCreate', async (scenario) => {
    const result = await autoCreate({ id: scenario.autoCreate.one.id })

    expect(result).toEqual(scenario.autoCreate.one)
  })

  scenario('creates a autoCreate', async () => {
    const result = await createAutoCreate({
      input: {
        scheduledAt: '2022-02-17T07:37:25Z',
        autoCreateAt: '2022-02-17T07:37:25Z',
        updatedAt: '2022-02-17T07:37:25Z',
      },
    })

    expect(result.scheduledAt).toEqual('2022-02-17T07:37:25Z')
    expect(result.autoCreateAt).toEqual('2022-02-17T07:37:25Z')
    expect(result.updatedAt).toEqual('2022-02-17T07:37:25Z')
  })

  scenario('updates a autoCreate', async (scenario) => {
    const original = await autoCreate({ id: scenario.autoCreate.one.id })
    const result = await updateAutoCreate({
      id: original.id,
      input: { scheduledAt: '2022-02-18T07:37:25Z' },
    })

    expect(result.scheduledAt).toEqual('2022-02-18T07:37:25Z')
  })

  scenario('deletes a autoCreate', async (scenario) => {
    const original = await deleteAutoCreate({ id: scenario.autoCreate.one.id })
    const result = await autoCreate({ id: original.id })

    expect(result).toEqual(null)
  })
})
