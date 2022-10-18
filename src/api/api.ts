import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: `http://localhost:7542/2.0/`,
  withCredentials: true,
})

export const getInAPI = {
  signUp(email: string, password: string) {
    return instance.post<{ email: string; password: string }, AxiosResponse<SignUpResType>>(
      `auth/register`,
      {
        email,
        password,
      }
    )
  },
}

// =============== Types ==============
type SignUpResType = {
  error: string
  email: string
  in: string
}
