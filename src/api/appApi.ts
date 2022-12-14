import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const appAPI = {
  me() {
    return instance.post<SignInResType>(`auth/me`)
  },
  singIn(email: string, password: string, rememberMe: boolean) {
    return instance.post<
      { email: string; password: string; rememberMe: boolean },
      AxiosResponse<SignInResType>
    >(`auth/login`, {
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
  signOut() {
    return instance.delete<SignOutResType>(`auth/me`)
  },
  forgotPassword(email: string, from: string, message: string) {
    return instance.post<{ email: string; from: string; message: string }, AxiosResponse<AppError>>(
      `auth/forgot`,
      { email, from, message }
    )
  },
  changeUserNameOrImage(name: string, avatar: string) {
    return instance.put<{ name: string; avatar: string }, AxiosResponse<ChangeNameResType>>(
      `auth/me`,
      { name, avatar }
    )
  },
  createNewPassword(password: string, resetPasswordToken: string) {
    return instance.post<{ newPassword: string; token: string }, AxiosResponse<AppError>>(
      `auth/set-new-password`,
      { password, resetPasswordToken }
    )
  },
}

// =============== Types for getInAPI ==============
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
  publicCardPacksCount: number

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean

  token?: ''
  tokenDeathTime?: number
  __v?: number
  error?: string
}

export type AppError = {
  error: string
}
export type ChangeNameResType = {
  updatedUser: SignInResType
  error?: string
}

export type SignOutResType = {
  info: string
  error: string
}
