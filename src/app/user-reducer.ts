import { AxiosError } from 'axios'

import { appAPI, AppError } from '../api/appApi'
import { errorHandler } from '../common/helpers/errorHandler'

import { isLoadingAC, setAppSuccessAC } from './app-reducer'
import { AppThunkType } from './store'

export type UserReducerStateType = {
  user: UserType
}
const initialState: UserReducerStateType = {
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
  state: UserReducerStateType = initialState,
  action: UserReducerActionsType
): UserReducerStateType => {
  switch (action.type) {
    case 'USER/SET-USER': {
      return { ...state, user: { ...action.userData } }
    }
    case 'USER/CHANGE-USERS-NAME': {
      return { ...state, user: { ...state.user, name: action.userName, avatar: action.avatar } }
    }
    case 'USER/SET-SING-OUT': {
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
export const changeUserNameOrAvatarAC = (userName: string, avatar: string) => {
  return { type: 'USER/CHANGE-USERS-NAME', userName, avatar } as const
}
// ================ Thunk creators ================

export const changeUserNameOrImageTC =
  (name: string, avatar: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      const res = await appAPI.changeUserNameOrImage(name, avatar)

      dispatch(setAppSuccessAC('You successfully update profile!'))
      if (res.data.updatedUser.avatar) {
        dispatch(changeUserNameOrAvatarAC(res.data.updatedUser.name, res.data.updatedUser.avatar))
      }
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
    } finally {
      dispatch(isLoadingAC(false))
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
  | ReturnType<typeof changeUserNameOrAvatarAC>
  | ReturnType<typeof deleteUserInformationAC>
