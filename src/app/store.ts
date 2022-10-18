import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppReducer, AppReducerActionsType } from './app-reducer'
import { AuthReducer, AuthReducerActionsType } from './auth-reducer'

let rootReducer = combineReducers({ app: AppReducer, auth: AuthReducer })

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// all action types must be here
export type AppActionsType = AppReducerActionsType | AuthReducerActionsType

export type RootStateType = ReturnType<typeof rootReducer>
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  AppActionsType
>
