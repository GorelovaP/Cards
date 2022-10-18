import axios, { AxiosError } from 'axios'

import { getInAPI, SignUpResType } from '../api/api'

import { signInAC } from './auth-reducer'
import { AppActionsType, AppThunkType } from './store'

// types variables
const APP_SET_INITIALIZED = 'APP_SET_INITIALIZED'
const APP_SIGNUP = 'APP_SIGNUP'
const APP_SIGNUP_ERROR = 'APP_SIGNUP_ERROR'

const initialState: AppStateType = {
  isInitialized: false,
  registered: false,
  regError: '',
}

export const AppReducer = (state: AppStateType = initialState, action: AppActionsType) => {
  switch (action.type) {
    case APP_SET_INITIALIZED: {
      return { ...state, isInitialized: action.initialized }
    }
    case APP_SIGNUP: {
      return { ...state, registered: action.registered }
    }
    case APP_SIGNUP_ERROR: {
      return { ...state, regError: action.regError }
    }
    default:
      return state
  }
}

export const setAppInitializedAC = (initialized: boolean) =>
  ({ type: APP_SET_INITIALIZED, initialized } as const)
export const signUpAC = (registered: boolean) => ({ type: APP_SIGNUP, registered } as const)
export const signUpSetErrorAC = (regError: string) =>
  ({ type: APP_SIGNUP_ERROR, regError } as const)

// ================ Thunk creators ================
export const initializeAppTC = (): AppThunkType => async dispatch => {
  try {
    const res = await getInAPI.me()

    dispatch(signInAC(true))
  } catch (e) {
    const errors = e as Error | AxiosError<SignUpResType>
  } finally {
    dispatch(setAppInitializedAC(true))
  }
}

export const signUpTC =
  (email: string, password: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(signUpSetErrorAC(''))
      const res = await getInAPI.signUp(email, password)

      dispatch(signUpAC(true))
    } catch (err) {
      const errors = err as Error | AxiosError<SignUpResType>

      if (axios.isAxiosError(errors)) {
        dispatch(signUpSetErrorAC(errors.response?.data.error))
      } else {
        dispatch(signUpSetErrorAC('Something went wrong...'))
      }
    }
  }

// ================ Types ====================
export type AppStateType = {
  isInitialized: boolean
  registered: boolean
  regError: string
}

//common type for reducer and to be merged in store
export type AppReducerActionsType =
  | ReturnType<typeof signUpAC>
  | ReturnType<typeof signUpSetErrorAC>
  | ReturnType<typeof setAppInitializedAC>
