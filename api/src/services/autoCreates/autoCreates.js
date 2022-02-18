import { db } from 'src/lib/db'

export const autoCreates = () => {
  return db.autoCreate.findMany()
}

export const autoCreate = ({ id }) => {
  return db.autoCreate.findUnique({
    where: { id },
  })
}

export const createAutoCreate = ({ input }) => {
  return db.autoCreate.create({
    data: input,
  })
}

export const updateAutoCreate = ({ id, input }) => {
  return db.autoCreate.update({
    data: input,
    where: { id },
  })
}

export const deleteAutoCreate = ({ id }) => {
  return db.autoCreate.delete({
    where: { id },
  })
}
