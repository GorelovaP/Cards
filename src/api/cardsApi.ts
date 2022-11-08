import { AxiosResponse } from 'axios'

import { instance } from './appApi'

export const cardsAPI = {
  getCards(
    cardAnswer?: string,
    cardQuestion?: string,
    cardsPack_id?: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page?: number,
    pageCount?: number
  ) {
    const params: ParamsType = {
      cardAnswer,
      cardQuestion,
      cardsPack_id,
      min,
      max,
      sortCards,
      page,
      pageCount,
    }

    return instance.get<ParamsType, AxiosResponse<getCardsResponseType>>(`cards/card/`, {
      params,
    })
  },

  addNewCard(card: {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: 0
    shots?: 0
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
  }) {
    return instance.post<{ card: AddNewCardType }, AxiosResponse<NewCardsType>>(`cards/card`, {
      card,
    })
  },

  deleteCard(id: string) {
    return instance.delete<{ id: string }, AxiosResponse<DeletedCardType>>(`cards/card?id=${id}`)
  },

  updateCardInfo(card: {
    _id: string
    question?: string
    answer?: string
    questionImg?: string
    answerImg?: string
  }) {
    return instance.put<
      {
        card: {
          _id: string
          question?: string
          answer?: string
          questionImg?: string
          answerImg?: string
        }
      },
      AxiosResponse<UpdateCardInfoType>
    >(`cards/card`, { card })
  },
  setGrades(grade: number, card_id: string) {
    return instance.put<{ grade: number; card_id: string }, AxiosResponse<SetGradesType>>(
      `cards/grade`,
      { grade, card_id }
    )
  },
}

// =============== Types for Cards API ==============
export type getCardsResponseType = {
  cards: CardsType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  packCreated: Date
  packDeckCover: string
  packName: string
  packPrivate: boolean
  packUpdated: Date
  packUserId: string
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}

export type CardsType = {
  answer: string
  cardsPack_id: string
  comments: string
  created: string
  grade: number
  more_id: string
  question: string
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  answerImg?: string
  questionImg?: string
  __v: number
  _id: string
}

export type NewCardsType = {
  newCard: CardsType
}
export type DeletedCardType = {
  deletedCard: CardsType
}
export type UpdateCardInfoType = {
  updatedCard: CardsType
}

type ParamsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}
type AddNewCardType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: 0
  shots?: 0
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type SetGradesType = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
  }
}
