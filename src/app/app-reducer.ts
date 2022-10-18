import { getInAPI } from '../api/api'

import { AppActionsType, AppThunkType } from './store'

// types variables
const APP_SIGNUP = 'APP_SIGNUP'
const initialState: AppStateType = {
  registered: false,
}

export const AppReducer = (state: AppStateType = initialState, action: AppActionsType) => {
  switch (action.type) {
    case APP_SIGNUP: {
      return { ...state, registered: action.registered }
    }
    default:
      return state
  }
}

export const signUpAC = (registered: boolean) => ({ type: APP_SIGNUP, registered } as const)

// ================ Thunk creators ================
export const signUpTC =
  (email: string, password: string): AppThunkType =>
  async dispatch => {
    const res = await getInAPI.signUp(email, password)

    console.log(res)
    if (!res.data.error) {
      dispatch(signUpAC(true))
    }
  }

// ================ Types ====================
export type AppStateType = {
  registered: boolean
}

//common type for reducer and to be merged in store
export type AppReducerActionsType = ReturnType<typeof signUpAC>
