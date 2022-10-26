import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const getInAPI = {
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
  changeUserName(name: string) {
    return instance.put<{ name: string }, AxiosResponse<ChangeNameResType>>(`auth/me`, { name })
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
  publicCardPacksCount: number // количество колод

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
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

// ============= Pack API ==================
export const packsAPI = {
  getPack(
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number,
    user_id?: string,
    block?: boolean
  ) {
    const params = {
      packName,
      min,
      max,
      sortPacks,
      page,
      pageCount,
      user_id,
      block,
    }

    return instance.get<CommonPackType>(`cards/pack`, { params })
  },
  addPack(cardsPack: { name?: string }) {
    return instance.post<NewCardsPackType>(`cards/pack`, { cardsPack })
  },
}

// =============== Types for packsAPI ==============
export type CommonPackType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
}
export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: Date
  updated: Date
  user_name: string
}
export type NewCardsPackType = {
  newCardsPack: PackType
}
