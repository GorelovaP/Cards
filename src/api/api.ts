import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: `http://localhost:7542/2.0/`,
  withCredentials: true,
})

export const getInAPI = {
  me() {
    return instance.post<AxiosResponse<SignInResType>>(`auth/me`)
  },
  singIn(email: string, password: string, rememberMe: boolean) {
    return instance.post<AxiosResponse<SignInResType>>(`auth/login`, {
      email,
      password,
      rememberMe,
    })
  },
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
export type SignUpResType = {
  error: string
  email: string
  in: string
}
export type SignInResType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number // количество колод
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean
  error?: string
}
