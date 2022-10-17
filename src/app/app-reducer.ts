import { getInAPI } from '../api/api'

import { AppDispatch } from './store'

export type AppStateType = {}
const initialState: AppStateType = {}

type ActionsType = ReturnType<typeof xAC>

export const AppReducer = (state: AppStateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'APP/X': {
      return state
    }
    default:
      return state
  }
}

export const xAC = () => {
  return { type: 'APP/X' }
}

// thunk creators
export const signUpTC = (email: string, password: string) => async (dispatch: AppDispatch) => {
  const res = await getInAPI.signUp(email, password)

  if (res.data.error) {
    console.log(res.data.error)
  }
}
