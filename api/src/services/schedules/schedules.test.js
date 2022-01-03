import {
  schedules,
  schedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from './schedules'

describe('schedules', () => {
  scenario('returns all schedules', async (scenario) => {
    const result = await schedules()

    expect(result.length).toEqual(Object.keys(scenario.schedule).length)
  })

  scenario('returns a single schedule', async (scenario) => {
    const result = await schedule({ id: scenario.schedule.one.id })

    expect(result).toEqual(scenario.schedule.one)
  })

  scenario('creates a schedule', async () => {
    const result = await createSchedule({
      input: { title: 'String', date: '2022-01-03T06:04:57Z' },
    })

    expect(result.title).toEqual('String')
    expect(result.date).toEqual('2022-01-03T06:04:57Z')
  })

  scenario('updates a schedule', async (scenario) => {
    const original = await schedule({ id: scenario.schedule.one.id })
    const result = await updateSchedule({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a schedule', async (scenario) => {
    const original = await deleteSchedule({ id: scenario.schedule.one.id })
    const result = await schedule({ id: original.id })

    expect(result).toEqual(null)
  })
})
