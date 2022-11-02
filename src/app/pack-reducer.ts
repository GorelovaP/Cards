import { AxiosError } from 'axios'

import { AppError } from '../api/appApi'
import { PackType, packsAPI, CommonPackType } from '../api/packsApi'
import { errorHandler } from '../common/helpers/errorHandler'

import { isLoadingAC } from './app-reducer'
import { updateInsidePackNameAC } from './cards-reducer'
import { AppThunkType } from './store'

const initialState: PackStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0,
  pageCount: 0,
  meOrAll: 'all',
  chosenPack: '',
  searchData: '',
  sort: '0updated',
  resetFilter: false,
}

export const PackReducer = (state = initialState, action: PackActionsType): PackStateType => {
  switch (action.type) {
    case 'PACK/SET-SEARCH-DATA':
    case 'PACK/SET-TOGGLE':
    case 'PACK/SET-PAGE-COUNT':
    case 'PACK/SET-CURRENT-PAGE':
    case 'PACK/CHOSEN-PACK':
    case 'PACK/SORT-UPDATED':
    case 'PACK/RESET-FILTER':
      return {
        ...state,
        ...action.payload,
      }
    case 'PACK/GET-PACKS': {
      return {
        ...state,
        ...action.payload.packData,
        cardPacks: action.payload.packData.cardPacks.map(tl => ({ ...tl })),
      }
    }
    case 'PACK/SET-MIN-MAX': {
      return {
        ...state,
        min: action.payload.min,
        max: action.payload.max,
        page: 1,
      }
    }
    case 'PACK/ADD-NEW-PACK': {
      return { ...state, cardPacks: [action.payload.newPack, ...state.cardPacks] }
    }
    case 'PACK/DELETE-PACK': {
      return { ...state, cardPacks: state.cardPacks.filter(i => i._id !== action.payload.packId) }
    }
    case 'PACK/UPDATE-PACK-NAME': {
      return {
        ...state,
        cardPacks: state.cardPacks.map(i =>
          i._id === action.payload._id ? { ...i, name: action.payload.name } : i
        ),
      }
    }
    case 'PACK/RESET-CHOSEN-PACK': {
      return { ...state, chosenPack: '' }
    }
    default:
      return state
  }
}

// ==================== Action creators ==================
export const getPacksAC = (packData: CommonPackType) => {
  return { type: 'PACK/GET-PACKS', payload: { packData } } as const
}

export const changeToggleAC = (meOrAll: meOrAllType) => {
  return { type: 'PACK/SET-TOGGLE', payload: { meOrAll } } as const
}

export const setPageCountAC = (pageCount: number) => {
  return { type: 'PACK/SET-PAGE-COUNT', payload: { pageCount } } as const
}

export const setCurrentPageAC = (page: number) => {
  return { type: 'PACK/SET-CURRENT-PAGE', payload: { page } } as const
}

export const setMinMaxAC = (min: number, max: number) => {
  return { type: 'PACK/SET-MIN-MAX', payload: { min, max } } as const
}

export const addNewPackAC = (newPack: PackType) => {
  return { type: 'PACK/ADD-NEW-PACK', payload: { newPack } } as const
}

export const chosenPackAC = (chosenPack: string) => {
  return { type: 'PACK/CHOSEN-PACK', payload: { chosenPack } } as const
}

export const deletePackAC = (packId: string) => {
  return { type: 'PACK/DELETE-PACK', payload: { packId } } as const
}

export const resetChosenPackAC = () => {
  return { type: 'PACK/RESET-CHOSEN-PACK' } as const
}

export const updatePackNameAC = (_id: string, name: string) => {
  return { type: 'PACK/UPDATE-PACK-NAME', payload: { _id, name } } as const
}

export const setSearchDataAC = (searchData: string) => {
  return { type: 'PACK/SET-SEARCH-DATA', payload: { searchData } } as const
}

export const sortUpdatedAC = (sort: sortType) => {
  return { type: 'PACK/SORT-UPDATED', payload: { sort } } as const
}

export const resetFilterAC = (resetFilter: boolean) => {
  return { type: 'PACK/RESET-FILTER', payload: { resetFilter } } as const
}

// ================ Thunk creators ================
export const getPackTC = (): AppThunkType => async (dispatch, getState) => {
  dispatch(isLoadingAC(true))

  try {
    const userId = getState().user.user._id
    const { searchData, min, max, sort, page, pageCount, meOrAll } = getState().packs
    const user_id = meOrAll === 'me' ? userId : ''
    const res = await packsAPI.getPack(searchData, min, max, sort, page, pageCount, user_id)

    dispatch(getPacksAC(res.data))
  } catch (err) {
    const error = err as Error | AxiosError<AppError>

    errorHandler({ error, dispatch })
  } finally {
    dispatch(isLoadingAC(false))
  }
}

export const addNewPackTC =
  (cardsPack: { name: string }): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      const res = await packsAPI.addPack(cardsPack)

      const newPack = res.data.newCardsPack

      dispatch(addNewPackAC(newPack))
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
    } finally {
      dispatch(isLoadingAC(false))
    }
  }

export const deletePackTC =
  (packId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      await packsAPI.deletePack(packId)

      dispatch(deletePackAC(packId))
      dispatch(resetChosenPackAC())
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
    } finally {
      dispatch(isLoadingAC(false))
    }
  }

export const updatePackNameTC =
  (cardsPack: { _id: string; name?: string }, menu?: boolean): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      const res = await packsAPI.updatePackName(cardsPack)
      const newPackName = res.data.updatedCardsPack
      const { _id, name } = newPackName

      if (!menu) {
        dispatch(updatePackNameAC(_id, name))
      } else {
        dispatch(updateInsidePackNameAC(name))
      }
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
    } finally {
      dispatch(isLoadingAC(false))
    }
  }
// ================ Types ====================

//common type for reducer and to be merged in store
export type PackActionsType =
  | ReturnType<typeof getPacksAC>
  | ReturnType<typeof changeToggleAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setMinMaxAC>
  | ReturnType<typeof addNewPackAC>
  | ReturnType<typeof chosenPackAC>
  | ReturnType<typeof deletePackAC>
  | ReturnType<typeof updatePackNameAC>
  | ReturnType<typeof setSearchDataAC>
  | ReturnType<typeof sortUpdatedAC>
  | ReturnType<typeof resetFilterAC>
  | ReturnType<typeof resetChosenPackAC>

type PackStateType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  meOrAll: meOrAllType
  chosenPack: string
  searchData: string
  sort: sortType
  resetFilter: boolean
  min?: number
  max?: number
}
type meOrAllType = 'me' | 'all'
export type sortType = '0updated' | '1updated'
