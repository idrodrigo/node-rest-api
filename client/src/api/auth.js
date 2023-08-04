import axios from './axios'

export const registerReq = async (user) =>
  axios.post('/auth/register', user)

export const loginReq = async (user) => 
  axios.post('/auth/login', user)

export const verifyTokenReq = async () => 
  axios.get('/auth/verify')

export const logoutReq = async () => 
  axios.post('/auth/logout')
  
export const deleteUserReq = async () => 
  axios.delete('/auth/delete')
