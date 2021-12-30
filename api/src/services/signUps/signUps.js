import { db } from 'src/lib/db'

export const signUps = () => {
  return db.signUp.findMany()
}

export const signUp = ({ id }) => {
  return db.signUp.findUnique({
    where: { id },
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
