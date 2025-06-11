import Client from './api'

export const getUser = async (id) => {
  const res = await Client.get(`/user/${id}`)
  return res.data
}
export const updateUser = async (id, data) => {
  const res = await Client.put(`/user/${id}`, data)
  return res.data
}
export const deleteUser = async (id) => {
  const res = await Client.delete(`/user/${id}`)
  return res.data
}
export const getAllUsers = async () => {
  const res = await Client.get('/user')
  return res.data
}

export const updatePassword = async (oldPassword, newPassword) => {
  const res = await Client.put('/auth/updatePassword', { oldPassword, newPassword })
  return res.data
}