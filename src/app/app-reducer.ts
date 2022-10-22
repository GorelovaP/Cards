import axios, { AxiosError } from 'axios'

import { AppError, getInAPI, SignInResType, SignOutResType, SignUpResType } from '../api/api'

import { AppActionsType, AppThunkType } from './store'
import { deleteUserInformationAC, setUserAC } from './user-reducer'

const initialState = {
  isInitialized: false,
  registered: false,
  isLoggedIn: false,
  appError: '',
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
    case 'APP/PASSWORD-RECOVERY-EMAIL': {
      return { ...state, passwordRecoveryEmail: action.email }
    }
    case 'APP/PASSWORD-RECOVERY-EMAIL-SENT': {
      return { ...state, passwordRecoveryEmailSent: action.sent }
    }
    case 'APP/NEW-PASSWORD-CREATED': {
      return { ...state, newPasswordCreated: action.sent }
    }
    case 'APP/SET-APP-ERROR': {
      return { ...state, appError: action.text }
    }
    case 'APP/IS-LOADING': {
      return { ...state, isLoading: action.isLoading }
    }
    case 'AUTH/SET-IS-LOGGED-IN': {
      return { ...state, isLoggedIn: action.value }
    }
    case 'AUTH/SET-IS-LOGGED-OUT': {
      return { ...state, isLoggedIn: false }
    }
    default:
      return state
  }
}

// ==================== Action creators ==================
export const setAppInitializedAC = (initialized: boolean) =>
  ({ type: 'APP/SET-INITIALIZED', initialized } as const)
export const signUpAC = (registered: boolean) => ({ type: 'APP/SIGNUP', registered } as const)
export const setPasswordRecoveryEmailAC = (email: string) =>
  ({ type: 'APP/PASSWORD-RECOVERY-EMAIL', email } as const)
export const passwordRecoveryEmailSentAC = (sent: boolean) =>
  ({ type: 'APP/PASSWORD-RECOVERY-EMAIL-SENT', sent } as const)
export const newPasswordCreatedAC = (sent: boolean) =>
  ({ type: 'APP/NEW-PASSWORD-CREATED', sent } as const)
export const setAppErrorAC = (text: string) => ({ type: 'APP/SET-APP-ERROR', text } as const)
export const isLoadingAC = (isLoading: boolean) => ({ type: 'APP/IS-LOADING', isLoading } as const)
export const signInAC = (value: boolean) => {
  return { type: 'AUTH/SET-IS-LOGGED-IN', value } as const
}
export const signOutAC = () => {
  return { type: 'AUTH/SET-IS-LOGGED-OUT' } as const
}

// ================ Thunk creators ================
export const initializeAppTC = (): AppThunkType => async dispatch => {
  try {
    const res = await getInAPI.me()

    dispatch(setUserAC(res.data))
    dispatch(signInAC(true))
  } catch (e) {
    const errors = e as Error | AxiosError<SignUpResType>

    if (axios.isAxiosError(errors)) {
      dispatch(setAppErrorAC(errors.response?.data.error))
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
      dispatch(setAppErrorAC(''))
      const res = await getInAPI.signUp(email, password)

      dispatch(signUpAC(true))
    } catch (err) {
      const errors = err as Error | AxiosError<SignUpResType>

      if (axios.isAxiosError(errors)) {
        if (errors.response?.data.error) {
          dispatch(setAppErrorAC(errors.response?.data.error))
        } else {
          dispatch(setAppErrorAC('Something went wrong...'))
        }
      }
    } finally {
      dispatch(isLoadingAC(false))
    }
  }

export const sendPasswordRecoveryTC =
  (email: string, from: string, message: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      dispatch(setAppErrorAC(''))
      const res = await getInAPI.forgotPassword(email, from, message)

      dispatch(setPasswordRecoveryEmailAC(email))
      dispatch(passwordRecoveryEmailSentAC(true))
    } catch (err) {
      const errors = err as Error | AxiosError<AppError>

      if (axios.isAxiosError(errors)) {
        if (errors.response?.data.error) {
          dispatch(setAppErrorAC(errors.response?.data.error))
        } else {
          dispatch(setAppErrorAC('Something went wrong...'))
        }
      }
    } finally {
      dispatch(isLoadingAC(false))
    }
  }

export const createNewPasswordTC =
  (newPassword: string, token: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      dispatch(setAppErrorAC(''))
      const res = await getInAPI.createNewPassword(newPassword, token)

      dispatch(newPasswordCreatedAC(true))
    } catch (err) {
      const errors = err as Error | AxiosError<AppError>

      if (axios.isAxiosError(errors)) {
        if (errors.response?.data.error) {
          dispatch(setAppErrorAC(errors.response?.data.error))
        } else {
          dispatch(setAppErrorAC('Something went wrong...'))
        }
      }
    } finally {
      dispatch(isLoadingAC(false))
    }
  }

export const singInTC =
  (data: SingInParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      dispatch(setAppErrorAC(''))
      const res = await getInAPI.singIn(data.email, data.password, data.rememberMe)

      dispatch(signInAC(true))
      dispatch(setUserAC(res.data))
    } catch (err) {
      const errors = err as Error | AxiosError<SignInResType>

      if (axios.isAxiosError(errors)) {
        if (errors.response?.data.error) {
          dispatch(setAppErrorAC(errors.response?.data.error))
        } else {
          dispatch(setAppErrorAC('Something went wrong...'))
        }
      }
    } finally {
      dispatch(isLoadingAC(false))
    }
  }
export const singOutTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(isLoadingAC(true))
    dispatch(setAppErrorAC(''))
    const res = await getInAPI.signOut()

    dispatch(signOutAC())
    dispatch(deleteUserInformationAC())
  } catch (err) {
    const errors = err as Error | AxiosError<SignOutResType>

    if (axios.isAxiosError(errors)) {
      if (errors.response?.data.error) {
        dispatch(setAppErrorAC(errors.response?.data.error))
      } else {
        dispatch(setAppErrorAC('Something went wrong...'))
      }
    }
  } finally {
    dispatch(isLoadingAC(false))
  }
}

// ================ Types ====================
export type AppStateType = typeof initialState

type SingInParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

//common type for reducer and to be merged in store
export type AppReducerActionsType =
  | ReturnType<typeof signUpAC>
  | ReturnType<typeof setAppInitializedAC>
  | ReturnType<typeof setUserAC>
  | ReturnType<typeof setPasswordRecoveryEmailAC>
  | ReturnType<typeof passwordRecoveryEmailSentAC>
  | ReturnType<typeof newPasswordCreatedAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof isLoadingAC>
  | ReturnType<typeof signInAC>
  | ReturnType<typeof signOutAC>
