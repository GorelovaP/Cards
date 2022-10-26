import axios, { AxiosError } from 'axios'

import { PackType, ChangeNameResType, packsAPI, CommonPackType } from '../api/api'

import { isLoadingAC, setAppErrorAC } from './app-reducer'
import { AppThunkType } from './store'

const initialState: PackStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0, // количество колод
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1, // выбранная страница
  pageCount: 0,
  meOrAll: 'all',
}

export const PackReducer = (state = initialState, action: PackActionsType) => {
  switch (action.type) {
    case 'PACK/SET-PACK-INFORMATION': {
      return {
        ...state,
        ...action.packData,
        cardPacks: action.packData.cardPacks.map(tl => ({ ...tl })),
      }
    }
    case 'PACK/SET-TOGGLE': {
      return {
        ...state,
        meOrAll: action.toggle,
      }
    }
    case 'PACK/SET-PAGE-COUNT': {
      return {
        ...state,
        pageCount: action.count,
      }
    }
    case 'PACK/SET-CURRENT-PAGE': {
      return {
        ...state,
        page: action.item,
      }
    }
    case 'PACK/SET-MIN-MAX': {
      return { ...state, minCardsCount: action.min, maxCardsCount: action.max }
    }
    case 'PACK/ADD-NEW-PACK': {
      return { ...state, cardPacks: [action.newPack, ...state.cardPacks] }
    }

    default:
      return state
  }
}

export const setPackAC = (packData: CommonPackType) => {
  return { type: 'PACK/SET-PACK-INFORMATION', packData } as const
}
export const changeToggleAC = (toggle: meOrAllType) => {
  return { type: 'PACK/SET-TOGGLE', toggle } as const
}
export const setPageCountAC = (count: number) => {
  return { type: 'PACK/SET-PAGE-COUNT', count } as const
}
export const setCurrentPageAC = (item: number) => {
  return { type: 'PACK/SET-CURRENT-PAGE', item } as const
}
export const setMinMaxAC = (max: number, min: number) => {
  return { type: 'PACK/SET-MIN-MAX', max, min } as const
}
export const addNewPackAC = (newPack: PackType) => {
  return { type: 'PACK/ADD-NEW-PACK', newPack } as const
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

// ================ Types ====================

//common type for reducer and to be merged in store
export type PackActionsType =
  | ReturnType<typeof setPackAC>
  | ReturnType<typeof changeToggleAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setMinMaxAC>
  | ReturnType<typeof addNewPackAC>

type PackStateType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
  meOrAll: meOrAllType
}
type meOrAllType = 'me' | 'all'
