import axios, { AxiosError } from 'axios'

import { AppError, getInAPI, SignUpResType } from '../api/api'

import { signInAC } from './auth-reducer'
import { AppActionsType, AppThunkType } from './store'
import { setUserAC } from './user-reducer'

// types variables
const APP_SET_INITIALIZED = 'APP_SET_INITIALIZED'
const APP_SIGNUP = 'APP_SIGNUP'
const APP_SIGNUP_ERROR = 'APP_SIGNUP_ERROR'
const APP_SET_COMMON_ERROR = 'APP_SET_COMMON_ERROR'
const APP_PASSWORD_RECOVERY_EMAIL = 'APP_PASSWORD_RECOVERY_EMAIL'
const APP_PASSWORD_RECOVERY_EMAIL_SENT = 'APP_PASSWORD_RECOVERY_EMAIL_SENT'
const APP_NEW_PASSWORD_CREATED = 'APP_NEW_PASSWORD_CREATED'

const initialState: AppStateType = {
  isInitialized: false,
  registered: false,
  regError: '',
  commonError: '',
  passwordRecoveryEmail: '',
  passwordRecoveryEmailSent: false,
  newPasswordCreated: false,
}

export const AppReducer = (
  state: AppStateType = initialState,
  action: AppActionsType
): AppStateType => {
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
    case APP_SET_COMMON_ERROR: {
      return { ...state, commonError: action.error }
    }
    case APP_PASSWORD_RECOVERY_EMAIL: {
      return { ...state, passwordRecoveryEmail: action.email }
    }
    case APP_PASSWORD_RECOVERY_EMAIL_SENT: {
      return { ...state, passwordRecoveryEmailSent: action.sent }
    }
    case APP_NEW_PASSWORD_CREATED: {
      return { ...state, newPasswordCreated: action.sent }
    }
    default:
      return state
  }
}

// ==================== Action creators ==================
export const setAppInitializedAC = (initialized: boolean) =>
  ({ type: APP_SET_INITIALIZED, initialized } as const)
export const signUpAC = (registered: boolean) => ({ type: APP_SIGNUP, registered } as const)
export const signUpSetErrorAC = (regError: string) =>
  ({ type: APP_SIGNUP_ERROR, regError } as const)
export const setCommonErrorAC = (error: string) => ({ type: APP_SET_COMMON_ERROR, error } as const)
export const setPasswordRecoveryEmailAC = (email: string) =>
  ({ type: APP_PASSWORD_RECOVERY_EMAIL, email } as const)
export const passwordRecoveryEmailSentAC = (sent: boolean) =>
  ({ type: APP_PASSWORD_RECOVERY_EMAIL_SENT, sent } as const)
export const newPasswordCreatedAC = (sent: boolean) =>
  ({ type: APP_NEW_PASSWORD_CREATED, sent } as const)

// ================ Thunk creators ================
export const initializeAppTC = (): AppThunkType => async dispatch => {
  try {
    const res = await getInAPI.me()

    dispatch(setUserAC(res.data))
    dispatch(signInAC(true))
  } catch (e) {
    const errors = e as Error | AxiosError<SignUpResType>

    if (axios.isAxiosError(errors)) {
      console.log('Вы не авторизованы')
      //dispatch(signUpSetErrorAC(errors.response?.data.error))
    }
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

export const sendPasswordRecoveryTC =
  (email: string, from: string, message: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setCommonErrorAC(''))
      const res = await getInAPI.forgotPassword(email, from, message)

      dispatch(setPasswordRecoveryEmailAC(email))
      dispatch(passwordRecoveryEmailSentAC(true))
    } catch (err) {
      const errors = err as Error | AxiosError<AppError>

      dispatch(setCommonErrorAC('Something went wrong...'))
    }
  }

export const createNewPasswordTC =
  (newPassword: string, token: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setCommonErrorAC(''))
      const res = await getInAPI.createNewPassword(newPassword, token)

      dispatch(newPasswordCreatedAC(true))
    } catch (err) {
      const errors = err as Error | AxiosError<AppError>

      dispatch(setCommonErrorAC('Something went wrong...'))
    }
  }
// ================ Types ====================
export type AppStateType = {
  isInitialized: boolean
  registered: boolean
  regError: string
  commonError: string
  passwordRecoveryEmail: string
  passwordRecoveryEmailSent: boolean
  newPasswordCreated: boolean
}

//common type for reducer and to be merged in store
export type AppReducerActionsType =
  | ReturnType<typeof signUpAC>
  | ReturnType<typeof signUpSetErrorAC>
  | ReturnType<typeof setAppInitializedAC>
  | ReturnType<typeof setUserAC>
  | ReturnType<typeof setCommonErrorAC>
  | ReturnType<typeof setPasswordRecoveryEmailAC>
  | ReturnType<typeof passwordRecoveryEmailSentAC>
  | ReturnType<typeof newPasswordCreatedAC>
