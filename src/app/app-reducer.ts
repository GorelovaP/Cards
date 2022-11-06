import { AxiosError } from 'axios'

import { AppError, appAPI } from '../api/appApi'
import { errorHandler } from '../common/helpers/errorHandler'

import { AppActionsType, AppThunkType } from './store'
import { deleteUserInformationAC, setUserAC } from './user-reducer'

const initialState = {
  isInitialized: false,
  registered: false,
  isLoggedIn: false,
  appError: '',
  appSuccess: '',
  passwordRecoveryEmail: '',
  passwordRecoveryEmailSent: false,
  newPasswordCreated: false,
  isLoading: false,
  firstRender: true,
}

export const AppReducer = (
  state: AppStateType = initialState,
  action: AppActionsType
): AppStateType => {
  switch (action.type) {
    case 'APP/SET-INITIALIZED':
    case 'APP/SIGNUP':
    case 'APP/PASSWORD-RECOVERY-EMAIL':
    case 'APP/PASSWORD-RECOVERY-EMAIL-SENT':
    case 'APP/NEW-PASSWORD-CREATED':
    case 'APP/SET-APP-ERROR':
    case 'APP/IS-LOADING':
    case 'AUTH/SET-IS-LOGGED-IN':
    case 'APP/SET-FIRST-RENDER':
      return { ...state, ...action.payload }
    case 'AUTH/SET-IS-LOGGED-OUT': {
      return { ...state, isLoggedIn: false }
    }
    default:
      return state
  }
}

// ==================== Action creators ==================
export const setAppInitializedAC = (isInitialized: boolean) =>
  ({ type: 'APP/SET-INITIALIZED', payload: { isInitialized } } as const)

export const setFirstRenderAC = (firstRender: boolean) =>
  ({ type: 'APP/SET-FIRST-RENDER', payload: { firstRender } } as const)

export const signUpAC = (registered: boolean) =>
  ({ type: 'APP/SIGNUP', payload: { registered } } as const)

export const setPasswordRecoveryEmailAC = (passwordRecoveryEmail: string) =>
  ({ type: 'APP/PASSWORD-RECOVERY-EMAIL', payload: { passwordRecoveryEmail } } as const)

export const passwordRecoveryEmailSentAC = (passwordRecoveryEmailSent: boolean) =>
  ({ type: 'APP/PASSWORD-RECOVERY-EMAIL-SENT', payload: { passwordRecoveryEmailSent } } as const)

export const newPasswordCreatedAC = (newPasswordCreated: boolean) =>
  ({ type: 'APP/NEW-PASSWORD-CREATED', payload: { newPasswordCreated } } as const)

export const setAppErrorAC = (appError: string) =>
  ({ type: 'APP/SET-APP-ERROR', payload: { appError } } as const)

export const setAppSuccessAC = (appSuccess: string) =>
  ({ type: 'APP/SET-APP-ERROR', payload: { appSuccess } } as const)

export const isLoadingAC = (isLoading: boolean) =>
  ({ type: 'APP/IS-LOADING', payload: { isLoading } } as const)

export const signInAC = (isLoggedIn: boolean) => {
  return { type: 'AUTH/SET-IS-LOGGED-IN', payload: { isLoggedIn } } as const
}

export const signOutAC = () => {
  return { type: 'AUTH/SET-IS-LOGGED-OUT' } as const
}

// ================ Thunk creators ================
export const initializeAppTC = (): AppThunkType => async dispatch => {
  try {
    const res = await appAPI.me()

    dispatch(setUserAC(res.data))
    dispatch(signInAC(true))
  } catch (err) {
    //const error = err as Error | AxiosError<AppError>
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
      await appAPI.signUp(email, password)

      dispatch(signUpAC(true))
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
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
      await appAPI.forgotPassword(email, from, message)

      dispatch(setPasswordRecoveryEmailAC(email))
      dispatch(passwordRecoveryEmailSentAC(true))
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
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
      await appAPI.createNewPassword(newPassword, token)

      dispatch(newPasswordCreatedAC(true))
    } catch (err: AxiosError<AppError> | any) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
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
      const res = await appAPI.singIn(data.email, data.password, data.rememberMe)

      dispatch(signInAC(true))
      dispatch(setUserAC(res.data))
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
    } finally {
      dispatch(isLoadingAC(false))
    }
  }
export const singOutTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(isLoadingAC(true))
    dispatch(setAppErrorAC(''))
    await appAPI.signOut()

    dispatch(signOutAC())
    dispatch(deleteUserInformationAC())
  } catch (err) {
    const error = err as Error | AxiosError<AppError>
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
  | ReturnType<typeof setAppSuccessAC>
  | ReturnType<typeof isLoadingAC>
  | ReturnType<typeof signInAC>
  | ReturnType<typeof signOutAC>
  | ReturnType<typeof setFirstRenderAC>
