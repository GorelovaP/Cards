import { SignInResType } from '../api/api'

export type initialStateType = {
  user: UserType
}
const initialState: initialStateType = {
  user: {},
}

export const UserReducer = (
  state: initialStateType = initialState,
  action: UserReducerActionsType
) => {
  switch (action.type) {
    case 'USER/SET-USER': {
      return { ...state, user: { ...action.userData } }
    }
    default:
      return state
  }
}

export const setUserAC = (userData: UserType) => {
  return { type: 'USER/SET-USER', userData } as const
}

// ================ Thunk creators ================

// ================ Types ====================
export type UserType = SignInResType | {}

//common type for reducer and to be merged in store
export type UserReducerActionsType = ReturnType<typeof setUserAC>
