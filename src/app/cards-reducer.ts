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
    default:
      return state
  }
}

export const getCardsAC = (cardsData: getCardsResponseType) => {
  return { type: 'CARDS/GET-CARDS', cardsData } as const
}
export const setCurrentFriendsPageAC = (item: number) => {
  return { type: 'CARDS/SET-CURRENT-PAGE', item } as const
}
export const addNewCardAC = (card: CardsType) => {
  return { type: 'CARDS/ADD-NEW-CARD', card } as const
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

      const newCard = res.data

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

export type CardsActionsType =
  | ReturnType<typeof getCardsAC>
  | ReturnType<typeof setCurrentFriendsPageAC>
  | ReturnType<typeof addNewCardAC>

type CardStateType = {
  cards: CardsType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}
