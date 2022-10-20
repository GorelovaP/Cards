import axios, { AxiosError } from 'axios'

import { AppError, getInAPI, SignUpResType } from '../api/api'

import { signInAC } from './auth-reducer'
import { AppActionsType, AppThunkType } from './store'
import { setUserAC } from './user-reducer'

const initialState: AppStateType = {
  isInitialized: false,
  registered: false,
  regError: '',
  commonError: '',
  passwordRecoveryEmail: '',
  passwordRecoveryEmailSent: false,
  newPasswordCreated: false,
  isLoading: false,
}

export const AppReducer = (
  state: AppStateType = initialState,
  action: AppActionsType
): AppStateType => {
  switch (action.type) {
    case 'APP/SET-INITIALIZED': {
      return { ...state, isInitialized: action.initialized }
    }
    case 'APP/SIGNUP': {
      return { ...state, registered: action.registered }
    }
    case 'APP/SIGNUP-ERROR': {
      return { ...state, regError: action.regError }
    }
    case 'APP/SET-COMMON-ERROR': {
      return { ...state, commonError: action.error }
    }
    case 'APP/PASSWORD-RECOVERY-EMAIL': {
      return { ...state, passwordRecoveryEmail: action.email }
    }
    case 'APP/PASSWORD-RECOVERY-EMAIL-SENT': {
      return { ...state, passwordRecoveryEmailSent: action.sent }
    }
    case 'APP/NEW-PASSWORD-CREATED': {
      return { ...state, newPasswordCreated: action.sent }
    }
    case 'APP/IS-LOADING': {
      return { ...state, isLoading: action.isLoading }
    }
    default:
      return state
  }
}

// ==================== Action creators ==================
export const setAppInitializedAC = (initialized: boolean) =>
  ({ type: 'APP/SET-INITIALIZED', initialized } as const)
export const signUpAC = (registered: boolean) => ({ type: 'APP/SIGNUP', registered } as const)
export const signUpSetErrorAC = (regError: string) =>
  ({ type: 'APP/SIGNUP-ERROR', regError } as const)
export const setCommonErrorAC = (error: string) =>
  ({ type: 'APP/SET-COMMON-ERROR', error } as const)
export const setPasswordRecoveryEmailAC = (email: string) =>
  ({ type: 'APP/PASSWORD-RECOVERY-EMAIL', email } as const)
export const passwordRecoveryEmailSentAC = (sent: boolean) =>
  ({ type: 'APP/PASSWORD-RECOVERY-EMAIL-SENT', sent } as const)
export const newPasswordCreatedAC = (sent: boolean) =>
  ({ type: 'APP/NEW-PASSWORD-CREATED', sent } as const)
export const isLoadingAC = (isLoading: boolean) => ({ type: 'APP/IS-LOADING', isLoading } as const)

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
      dispatch(isLoadingAC(true))
      dispatch(signUpSetErrorAC(''))
      const res = await getInAPI.signUp(email, password)

      dispatch(signUpAC(true))
      dispatch(isLoadingAC(false))
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
      dispatch(isLoadingAC(true))
      dispatch(setCommonErrorAC(''))
      const res = await getInAPI.forgotPassword(email, from, message)

      dispatch(setPasswordRecoveryEmailAC(email))
      dispatch(passwordRecoveryEmailSentAC(true))
      dispatch(isLoadingAC(false))
    } catch (err) {
      const errors = err as Error | AxiosError<AppError>

      dispatch(setCommonErrorAC('Something went wrong...'))
    }
  }

export const createNewPasswordTC =
  (newPassword: string, token: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      dispatch(setCommonErrorAC(''))
      const res = await getInAPI.createNewPassword(newPassword, token)

      dispatch(newPasswordCreatedAC(true))
      dispatch(isLoadingAC(false))
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
  isLoading: boolean
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
  | ReturnType<typeof isLoadingAC>
