import axios, { AxiosError } from 'axios'

import { cardsAPI, CardsType, ChangeNameResType, getCardsResponseType } from '../api/api'

import { isLoadingAC, setAppErrorAC } from './app-reducer'
import { AppThunkType } from './store'

const initialState: CardStateType = {
  cards: [],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 0,
  packUserId: '',
  packName: '',
}

export const CardsReducer = (state = initialState, action: CardsActionsType) => {
  switch (action.type) {
    case 'CARDS/GET-CARDS': {
      return {
        ...state,
        ...action.cardsData,
        cards: action.cardsData.cards.map(tl => ({ ...tl })),
      }
    }
    case 'CARDS/SET-CURRENT-PAGE': {
      return {
        ...state,
        page: action.item,
      }
    }
    case 'CARDS/ADD-NEW-CARD': {
      return { ...state, cards: [action.card, ...state.cards] }
    }
    case 'CARDS/DELETE-CARD': {
      return { ...state, cards: state.cards.filter(i => i._id !== action.id) }
    }
    case 'CARDS/UPDATE-CARD-INFO': {
      return {
        ...state,
        cards: state.cards.map(i =>
          i._id === action.id ? { ...i, question: action.question, answer: action.answer } : i
        ),
      }
    }
    case 'CARDS/SET-PAGE-COUNT': {
      return {
        ...state,
        pageCount: action.pageCount,
      }
    }
    case 'CARDS/UPDATE-INSIDE-PACK-NAME': {
      return { ...state, packName: action.name }
    }
    default:
      return state
  }
}

export const getCardsAC = (cardsData: getCardsResponseType) => {
  return { type: 'CARDS/GET-CARDS', cardsData } as const
}
export const setCurrentCardsPageAC = (item: number) => {
  return { type: 'CARDS/SET-CURRENT-PAGE', item } as const
}
export const addNewCardAC = (card: CardsType) => {
  return { type: 'CARDS/ADD-NEW-CARD', card } as const
}
export const deleteCardAC = (id: string) => {
  return { type: 'CARDS/DELETE-CARD', id } as const
}
export const updateCardInfoAC = (id: string, question: string, answer: string) => {
  return { type: 'CARDS/UPDATE-CARD-INFO', id, question, answer } as const
}
export const setPageCountCardsAC = (pageCount: number) => {
  return { type: 'CARDS/SET-PAGE-COUNT', pageCount } as const
}
export const updateInsidePackNameAC = (name: string) => {
  return { type: 'CARDS/UPDATE-INSIDE-PACK-NAME', name } as const
}

export const getCardsTC =
  (
    cardAnswer?: string,
    cardQuestion?: string,
    cardsPack_id?: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page?: number,
    pageCount?: number
  ): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      const res = await cardsAPI.getCards(
        cardAnswer,
        cardQuestion,
        cardsPack_id,
        min,
        max,
        sortCards,
        page,
        pageCount
      )

      dispatch(getCardsAC(res.data))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(isLoadingAC(false))
    }
  }

export const addNewCardTC =
  (card: {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: 0
    shots?: 0
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
  }): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      const res = await cardsAPI.addNewCard(card)

      const newCard = res.data.newCard

      dispatch(addNewCardAC(newCard))
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
export const deleteCardTC =
  (id: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      const res = await cardsAPI.deleteCard(id)

      dispatch(deleteCardAC(id))
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
export const updateCardInfoTC =
  (card: { _id: string; question: string; answer: string }): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      const res = await cardsAPI.updateCardInfo(card)
      const updatedCard = res.data.updatedCard
      const { _id, question, answer } = updatedCard

      dispatch(updateCardInfoAC(_id, question, answer))
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

export type CardsActionsType =
  | ReturnType<typeof getCardsAC>
  | ReturnType<typeof setCurrentCardsPageAC>
  | ReturnType<typeof addNewCardAC>
  | ReturnType<typeof deleteCardAC>
  | ReturnType<typeof updateCardInfoAC>
  | ReturnType<typeof setPageCountCardsAC>
  | ReturnType<typeof updateInsidePackNameAC>

type CardStateType = {
  cards: CardsType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
}
