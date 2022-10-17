import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { getInAPI } from '../api/api'

import { AppThunkType } from './store'

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

export const xAC = () => ({ type: 'APP/X' } as const)
export type xACType = ReturnType<typeof xAC>

// thunk creators
export const signUpTC =
  (email: string, password: string): AppThunkType =>
  async dispatch => {
    const res = await getInAPI.signUp(email, password)
  }

export type AppReducerActionsType = xACType
