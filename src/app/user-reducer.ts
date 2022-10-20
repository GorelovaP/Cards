import axios, { AxiosError } from 'axios'

import { ChangeNameResType, getInAPI } from '../api/api'

import { AppThunkType } from './store'

export type initialStateType = {
  user: UserType
}
const initialState: initialStateType = {
  user: {
    _id: '',
    email: '',
    rememberMe: false,
    isAdmin: false,
    name: '',
    verified: false,
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    __v: 0,
    token: '',
    tokenDeathTime: 0,
    avatar: '',
  },
}

export const UserReducer = (
  state: initialStateType = initialState,
  action: UserReducerActionsType
) => {
  switch (action.type) {
    case 'USER/SET-USER': {
      return { ...state, user: { ...action.userData } }
    }
    case 'USER/CHANGE-USERS-NAME': {
      return { ...state, user: { ...state.user, name: action.userName } }
    }
    case 'USER/SET-SING-OUT': {
      debugger

      return { ...state, user: { ...initialState.user } }
    }

    default:
      return state
  }
}

export const setUserAC = (userData: UserType) => {
  return { type: 'USER/SET-USER', userData } as const
}
export const deleteUserInformationAC = () => {
  return { type: 'USER/SET-SING-OUT' } as const
}
export const changeUserNameAC = (userName: string) => {
  return { type: 'USER/CHANGE-USERS-NAME', userName } as const
}

// ================ Thunk creators ================

export const changeUserNameTC =
  (name: string): AppThunkType =>
  async dispatch => {
    try {
      const res = await getInAPI.changeUserName(name)

      dispatch(changeUserNameAC(res.data.updatedUser.name))
    } catch (e) {
      const errors = e as Error | AxiosError<ChangeNameResType>

      if (axios.isAxiosError(errors)) {
        console.log(errors)
      }
    }
  }
// ================ Types ====================
export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number // количество колод

  created: Date | ''
  updated: Date | ''
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  token?: ''
  tokenDeathTime?: number
  __v?: number
  error?: string
}

//common type for reducer and to be merged in store
export type UserReducerActionsType =
  | ReturnType<typeof setUserAC>
  | ReturnType<typeof changeUserNameAC>
  | ReturnType<typeof deleteUserInformationAC>
