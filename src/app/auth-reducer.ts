import axios, { AxiosError } from 'axios'

import { getInAPI, SignUpResType } from '../api/api'

import { AppThunkType } from './store'
import { deleteUserInformationAC, setUserAC } from './user-reducer'

export type initialStateType = {
  isLoggedIn: boolean
  signInError: string
}
const initialState: initialStateType = {
  isLoggedIn: false,
  signInError: '',
}

export const AuthReducer = (
  state: initialStateType = initialState,
  action: AuthReducerActionsType
) => {
  switch (action.type) {
    case 'AUTH/SET-IS-LOGGED-IN': {
      return { ...state, isLoggedIn: action.value }
    }
    case 'AUTH/SET-IN-ERROR': {
      return { ...state, signInError: action.regError }
    }
    case 'AUTH/SET-IS-LOGGED-OUT': {
      return { ...state, isLoggedIn: false }
    }
    default:
      return state
  }
}

export const signInAC = (value: boolean) => {
  return { type: 'AUTH/SET-IS-LOGGED-IN', value } as const
}
export const signOutAC = () => {
  return { type: 'AUTH/SET-IS-LOGGED-OUT' } as const
}
export const signInSetErrorAC = (regError: string) => {
  return { type: 'AUTH/SET-IN-ERROR', regError } as const
}

// ================ Thunk creators ================
export const singInTC =
  (data: singInParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(signInSetErrorAC(''))
      const res = await getInAPI.singIn(data.email, data.password, data.rememberMe)

      dispatch(signInAC(true))
      dispatch(setUserAC(res.data))
    } catch (err) {
      const errors = err as Error | AxiosError<SignUpResType>

      if (axios.isAxiosError(errors)) {
        dispatch(signInSetErrorAC(errors.response?.data.error))
      } else {
        dispatch(signInSetErrorAC('Something went wrong...'))
      }
    }
  }
export const singOutTC = (): AppThunkType => async dispatch => {
  try {
    const res = await getInAPI.signOut()

    dispatch(signOutAC())
    dispatch(deleteUserInformationAC())
  } catch (err) {
    const errors = err as Error | AxiosError<SignUpResType>

    if (axios.isAxiosError(errors)) {
      dispatch(signInSetErrorAC(errors.response?.data.error))
    } else {
      dispatch(signInSetErrorAC('Something went wrong...'))
    }
  }
}

// ================ Types ====================
type singInParamsType = {
  email: string
  password: string
  rememberMe: boolean
}
//common type for reducer and to be merged in store
export type AuthReducerActionsType =
  | ReturnType<typeof signInAC>
  | ReturnType<typeof signInSetErrorAC>
  | ReturnType<typeof signOutAC>
