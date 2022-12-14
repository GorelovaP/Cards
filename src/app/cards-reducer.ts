import { AxiosError } from 'axios'

import { AppError } from '../api/appApi'
import { cardsAPI, CardsType, getCardsResponseType, SetGradesType } from '../api/cardsApi'
import { errorHandler } from '../common/helpers/errorHandler'

import { isLoadingAC, setAppSuccessAC, setFirstRenderAC } from './app-reducer'
import { sortType } from './pack-reducer'
import { AppThunkType } from './store'

const initialState: CardStateType = {
  cards: [],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 0,
  pageCount: 0,
  packUserId: '',
  packName: '',
  sortSettings: '0updated',
  searchData: '',
  packPrivate: false,
}

export const CardsReducer = (state = initialState, action: CardsActionsType): CardStateType => {
  switch (action.type) {
    case 'CARDS/SET-CURRENT-PAGE':
    case 'CARDS/SET-SEARCH-DATA':
    case 'CARDS/SET-SORT-SETTINGS':
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
    case 'CARDS/UPDATE-CARD-INFO': {
      return {
        ...state,
        cards: state.cards.map(i =>
          i._id === action.payload.id
            ? {
                ...i,
                question: action.payload.question,
                answer: action.payload.answer,
                questionImg: action.payload.questionImg,
                answerImg: action.payload.answerImg,
              }
            : i
        ),
      }
    }
    case 'CARDS/SET-GRADES': {
      return {
        ...state,
        cards: state.cards.map(i =>
          i._id === action.payload.updateData.updatedGrade.card_id
            ? {
                ...i,
                grade: action.payload.updateData.updatedGrade.grade,
                shots: action.payload.updateData.updatedGrade.shots,
              }
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

export const updateCardInfoAC = (
  id: string,
  question: string,
  answer: string,
  questionImg?: string,
  answerImg?: string
) => {
  return {
    type: 'CARDS/UPDATE-CARD-INFO',
    payload: { id, question, answer, questionImg, answerImg },
  } as const
}

export const setPageCountCardsAC = (pageCount: number) => {
  return { type: 'CARDS/SET-PAGE-COUNT', payload: { pageCount } } as const
}

export const updateInsidePackNameAC = (packName: string) => {
  return { type: 'CARDS/UPDATE-INSIDE-PACK-NAME', payload: { packName } } as const
}

export const setSortSettingsAC = (sortSettings: sortType) => {
  return { type: 'CARDS/SET-SORT-SETTINGS', payload: { sortSettings } } as const
}

export const setSearchDataCardsAC = (searchData: string) => {
  return { type: 'CARDS/SET-SEARCH-DATA', payload: { searchData } } as const
}
export const setGradesAC = (updateData: SetGradesType) => {
  return { type: 'CARDS/SET-GRADES', payload: { updateData } } as const
}

// ================ Thunk creators ================
export const getCardsTC =
  (learn?: boolean): AppThunkType =>
  async (dispatch, getState) => {
    try {
      dispatch(isLoadingAC(true))

      const { page, pageCount, sortSettings, minGrade, maxGrade, searchData } = getState().cards

      const { chosenPack, cardPacksTotalCount } = getState().packs

      let res

      learn
        ? (res = await cardsAPI.getCards(
            undefined,
            undefined,
            chosenPack,
            minGrade,
            maxGrade,
            sortSettings,
            page,
            cardPacksTotalCount
          ))
        : (res = await cardsAPI.getCards(
            undefined,
            searchData,
            chosenPack,
            minGrade,
            maxGrade,
            sortSettings,
            page,
            pageCount
          ))

      dispatch(getCardsAC(res.data))
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
    } finally {
      dispatch(isLoadingAC(false))
      dispatch(setFirstRenderAC(false))
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
      await cardsAPI.addNewCard(card)
      await dispatch(getCardsTC())
      dispatch(setAppSuccessAC('You successfully add new card!'))
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
      await cardsAPI.deleteCard(id)
      await dispatch(getCardsTC())
      dispatch(setAppSuccessAC('You successfully delete card!'))
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
    } finally {
      dispatch(isLoadingAC(false))
    }
  }
export const updateCardInfoTC =
  (card: {
    _id: string
    question?: string
    answer?: string
    questionImg?: string
    answerImg?: string
  }): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))

      const res = await cardsAPI.updateCardInfo(card)
      const updatedCard = res.data.updatedCard

      const { _id, question, answer, questionImg, answerImg } = updatedCard

      dispatch(updateCardInfoAC(_id, question, answer, questionImg, answerImg))
      dispatch(setAppSuccessAC('You successfully update card information!'))
    } catch (err) {
      const error = err as Error | AxiosError<AppError>

      errorHandler({ error, dispatch })
    } finally {
      dispatch(isLoadingAC(false))
    }
  }

export const setGradesTC =
  (grade: number, card_id: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(isLoadingAC(true))
      const res = await cardsAPI.setGrades(grade, card_id)

      dispatch(setGradesAC(res.data))
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
  | ReturnType<typeof updateCardInfoAC>
  | ReturnType<typeof setPageCountCardsAC>
  | ReturnType<typeof updateInsidePackNameAC>
  | ReturnType<typeof setSortSettingsAC>
  | ReturnType<typeof setSearchDataCardsAC>
  | ReturnType<typeof setGradesAC>

type CardStateType = {
  cards: CardsType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
  sortSettings: sortType
  searchData: string
  packPrivate: boolean
  packDeckCover?: string
}
