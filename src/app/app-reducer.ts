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
