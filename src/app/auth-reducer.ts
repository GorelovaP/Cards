import { getInAPI } from '../api/api'

import { AppThunkType } from './store'

export type initialStateType = {
  isLoggedIn: boolean
}
const initialState: initialStateType = {
  isLoggedIn: false,
}

export type AuthReducerActionsType = ReturnType<typeof signInAC>

export const AuthReducer = (
  state: initialStateType = initialState,
  action: AuthReducerActionsType
) => {
  switch (action.type) {
    case 'AUTH/SET-IS-LOGGED-IN': {
      return { ...state, isLoggedIn: action.value }
    }
    default:
      return state
  }
}

export const signInAC = (value: boolean) => {
  return { type: 'AUTH/SET-IS-LOGGED-IN', value } as const
}

// ================ Thunk creators ================
export const singInTC =
  (data: singInParamsType): AppThunkType =>
  dispatch => {
    getInAPI
      .singIn(data.email, data.password, data.rememberMe)
      .then(res => {
        dispatch(signInAC(true))
      })
      .catch(error => {
        console.log(error)
      })
  }
// ================ Types ====================
type singInParamsType = {
  email: string
  password: string
  rememberMe: boolean
}
//common type for reducer and to be merged in store
