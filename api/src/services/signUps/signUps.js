import { db } from 'src/lib/db'

export const signUps = () => {
  return db.signUp.findMany()
}

export const signUp = ({ id }) => {
  return db.signUp.findUnique({
    where: { id },
  })
}

export const activeSignups = () => {
  return db.signUp.findMany({
    where: {
      schedule: {
        active: true,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}
export const createSignUp = ({ input }) => {
  return db.signUp.create({
    data: input,
  })
}

export const updateSignUp = ({ id, input }) => {
  return db.signUp.update({
    data: input,
    where: { id },
  })
}

export const swapSignupPositions = async ({ id1, id2})=>{
  let signups = await db.signUp.findMany({
    where: { OR: [{id: id1}, {id: id2}]}
  })

  await db.signUp.update({
    where: {id: signups[1].id},
    data: {
      userId : signups[0].userId
    }
  })

  await db.signUp.update({
    where: {id: signups[0].id},
    data: {
      userId : signups[1].userId
    }
  })

  return await db.signUp.findMany({
    where: { OR: [{id: id1}, {id: id2}]}
  })
}

export const deleteSignUp = ({ id }) => {
  return db.signUp.delete({
    where: { id },
  })
}

export const SignUp = {
  schedule: (_obj, { root }) =>
    db.signUp.findUnique({ where: { id: root.id } }).schedule(),
  user: (_obj, { root }) =>
    db.signUp.findUnique({ where: { id: root.id } }).user(),
}
