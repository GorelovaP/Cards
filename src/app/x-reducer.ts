export type XStateType = {}
const initialState: XStateType = {}

type ActionsType = ReturnType<typeof xAC>

export const XReducer = (state: XStateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'X/DO-X': {
      return state
    }
    default:
      return state
  }
}

export const xAC = () => {
  return { type: 'X/DO-X' }
}
