import { AxiosError } from 'axios'

import { AppError } from '../api/appApi'
import { cardsAPI, CardsType, getCardsResponseType } from '../api/cardsApi'
import { errorHandler } from '../common/helpers/errorHandler'

import { isLoadingAC } from './app-reducer'
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
    case 'CARDS/SET-CURRENT-PAGE':
    case 'CARDS/SET-PAGE-COUNT':
    case 'CARDS/UPDATE-INSIDE-PACK-NAME':
      return { ...state, ...action.payload }
    case 'CARDS/GET-CARDS': {
      return {
        ...state,
        ...action.payload.cardsData,
        cards: action.payload.cardsData.cards.map(tl => ({ ...tl })),
      }
    }
    case 'CARDS/ADD-NEW-CARD': {
      return { ...state, cards: [action.payload.card, ...state.cards] }
    }
    case 'CARDS/DELETE-CARD': {
      return { ...state, cards: state.cards.filter(i => i._id !== action.payload.id) }
    }
    case 'CARDS/UPDATE-CARD-INFO': {
      return {
        ...state,
        cards: state.cards.map(i =>
          i._id === action.payload.id
            ? { ...i, question: action.payload.question, answer: action.payload.answer }
            : i
        ),
      }
    }
    default:
      return state
  }
}

// ==================== Action creators ==================
export const getCardsAC = (cardsData: getCardsResponseType) => {
  return { type: 'CARDS/GET-CARDS', payload: { cardsData } } as const
}

export const setCurrentCardsPageAC = (page: number) => {
  return { type: 'CARDS/SET-CURRENT-PAGE', payload: { page } } as const
}

export const addNewCardAC = (card: CardsType) => {
  return { type: 'CARDS/ADD-NEW-CARD', payload: { card } } as const
}

export const deleteCardAC = (id: string) => {
  return { type: 'CARDS/DELETE-CARD', payload: { id } } as const
}

export const updateCardInfoAC = (id: string, question: string, answer: string) => {
  return { type: 'CARDS/UPDATE-CARD-INFO', payload: { id, question, answer } } as const
}

export const setPageCountCardsAC = (pageCount: number) => {
  return { type: 'CARDS/SET-PAGE-COUNT', payload: { pageCount } } as const
}

export const updateInsidePackNameAC = (packName: string) => {
  return { type: 'CARDS/UPDATE-INSIDE-PACK-NAME', payload: { packName } } as const
}

// ================ Thunk creators ================
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
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
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
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
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
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
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
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
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
