import Client from './api'

export const RegisterUser = async (data) => {

  const res = await Client.post('/auth/register', data , { withCredentials: true })
  return res.data

}

export const SignInUser = async (data) => {

  const res = await Client.post('/auth/login', data)
  // Set the current signed in users token to localStorage
  localStorage.setItem('token', res.data.token)
  return res.data.user

}

export const CheckSession = async () => {

  // Checks if the current token if it exists is valid
  const res = await Client.get('/auth/session')
  return res.data

}