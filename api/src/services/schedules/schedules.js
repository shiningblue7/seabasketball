import { db } from 'src/lib/db'

export const schedules = () => {
  return db.schedule.findMany()
}

export const schedule = ({ id }) => {
  return db.schedule.findUnique({
    where: { id },
  })
}

export const activeSchedule = () => {
  return db.schedule.findFirst({
    where: { active: true },
  })
}

async function disableActive(excludeId) {
  let schedules = await db.schedule.findMany({
    where: { active: true },
  })
  for (const schedule of schedules) {
    if (schedule.id == excludeId) {
      continue
    }

    let castData = Object.assign(schedule, {
      active: false,
    })
    let id = schedule.id
    delete castData.id
    let scheduleRec = await db.schedule.update({
      data: castData,
      where: { id: id },
    })
  }
  return
}

export const createSchedule = async ({ input }) => {
  if (input.active == true) {
    disableActive()
  }

  let record = await db.schedule.create({
    data: input,
  })
  // console.log('record' , record.id)
  // get all members
  let members = await db.user.findMany({
    where: { member: true },
    orderBy: {
      roles: 'asc'
    }
  })

  async function createThem (members) {
    for (const member of members) {
      // console.log('member' , member.id)
      let data = {}
      const castData = Object.assign(data, {
        scheduleId: parseInt(record.id),
        userId: parseInt(member.id)
      })
      // console.log('castData', castData)
      let memberRec = await db.signUp.create({
        data: castData,
      })
      // console.log('memberRec id', memberRec.id)
      }
  }
  createThem(members)

  return record
}

export const updateSchedule = async ({ id, input }) => {
  if (input.active == true) {
    disableActive(id)
  }

  return db.schedule.update({
    data: input,
    where: { id },
  })
}

export const deleteSchedule = ({ id }) => {
  return db.schedule.delete({
    where: { id },
  })
}

export const Schedule = {
  SignUp: (_obj, { root }) =>
    db.schedule.findUnique({ where: { id: root.id } }).SignUp(),
}
