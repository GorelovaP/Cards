import axios, { AxiosError } from 'axios'

import { ChangeNameResType } from '../api/appApi'
import { PackType, packsAPI, CommonPackType } from '../api/packsApi'

import { isLoadingAC, setAppErrorAC } from './app-reducer'
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
  searchData: undefined,
  sort: '0updated',
  resetFilter: false,
  staticMin: undefined,
  staticMax: undefined,
}

export const PackReducer = (state = initialState, action: PackActionsType) => {
  switch (action.type) {
    case 'PACK/SET-TOGGLE':
    case 'PACK/SET-PAGE-COUNT':
    case 'PACK/SET-CURRENT-PAGE':
    case 'PACK/CHOSEN-PACK':
    case 'PACK/SORT-UPDATED':
    case 'PACK/SET-SEARCH-DATA':
    case 'PACK/RESET-FILTER':
      return {
        ...state,
        ...action.payload,
      }
    case 'PACK/SET-PACK-INFORMATION': {
      return {
        ...state,
        ...action.payload.packData,
        staticMin: action.payload.packData.minCardsCount,
        staticMax: action.payload.packData.maxCardsCount,
        cardPacks: action.payload.packData.cardPacks.map(tl => ({ ...tl })),
      }
    }
    case 'PACK/SET-MIN-MAX': {
      return {
        ...state,
        minCardsCount: action.payload.minCardsCount,
        maxCardsCount: action.payload.maxCardsCount,
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
export const setPackAC = (packData: CommonPackType) => {
  return { type: 'PACK/SET-PACK-INFORMATION', payload: { packData } } as const
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

export const setMinMaxAC = (minCardsCount: number, maxCardsCount: number) => {
  return { type: 'PACK/SET-MIN-MAX', payload: { minCardsCount, maxCardsCount } } as const
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

export const setSearchDataAC = (searchData: string | undefined) => {
  return { type: 'PACK/SET-SEARCH-DATA', payload: { searchData } } as const
}

export const sortUpdatedAC = (sort: sortType) => {
  return { type: 'PACK/SORT-UPDATED', payload: { sort } } as const
}

export const resetFilterAC = (resetFilter: boolean) => {
  return { type: 'PACK/RESET-FILTER', payload: { resetFilter } } as const
}

// ================ Thunk creators ================
export const getPackTC =
  (
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number,
    user_id?: string,
    block?: boolean
  ): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))

      const res = await packsAPI.getPack(
        packName,
        min,
        max,
        sortPacks,
        page,
        pageCount,
        user_id,
        block
      )

      dispatch(setPackAC(res.data))
      if (min || max) {
        dispatch(setMinMaxAC(min!, max!))
      }
      if (page) {
        dispatch(setCurrentPageAC(page))
      }
    } catch (e) {
      const errors = e as Error | AxiosError<ChangeNameResType>

      if (axios.isAxiosError(errors)) {
        if (errors.response?.data.error) {
          dispatch(setAppErrorAC(errors.response?.data.error))
        } else {
          dispatch(setAppErrorAC('Something went wrong...'))
        }
      }
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
    } catch (e) {
      const errors = e as Error | AxiosError<ChangeNameResType>

      if (axios.isAxiosError(errors)) {
        if (errors.response?.data.error) {
          dispatch(setAppErrorAC(errors.response?.data.error))
        } else {
          dispatch(setAppErrorAC('Something went wrong...'))
        }
      }
    } finally {
      dispatch(isLoadingAC(false))
    }
  }

export const deletePackTC =
  (packId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      const res = await packsAPI.deletePack(packId)

      dispatch(deletePackAC(packId))
      dispatch(resetChosenPackAC())
    } catch (e) {
      const errors = e as Error | AxiosError<ChangeNameResType>

      if (axios.isAxiosError(errors)) {
        if (errors.response?.data.error) {
          dispatch(setAppErrorAC(errors.response?.data.error))
        } else {
          dispatch(setAppErrorAC('Something went wrong...'))
        }
      }
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
    } catch (e) {
      const errors = e as Error | AxiosError<ChangeNameResType>

      if (axios.isAxiosError(errors)) {
        if (errors.response?.data.error) {
          dispatch(setAppErrorAC(errors.response?.data.error))
        } else {
          dispatch(setAppErrorAC('Something went wrong...'))
        }
      }
    } finally {
      dispatch(isLoadingAC(false))
    }
  }
// ================ Types ====================

//common type for reducer and to be merged in store
export type PackActionsType =
  | ReturnType<typeof setPackAC>
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
  cardPacksTotalCount: number // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
  meOrAll: meOrAllType
  chosenPack: string
  searchData: string | undefined
  sort: sortType
  resetFilter: boolean
  staticMin: number | undefined
  staticMax: number | undefined
}
type meOrAllType = 'me' | 'all'
export type sortType = '0updated' | '1updated'
