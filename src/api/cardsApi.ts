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
    const params = {
      cardAnswer,
      cardQuestion,
      cardsPack_id,
      min,
      max,
      sortCards,
      page,
      pageCount,
    }

    return instance.get<ParamsType, AxiosResponse<getCardsResponseType>>(`cards/card`, { params })
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

  updateCardInfo(card: { _id: string; question: string; answer: string }) {
    return instance.put<
      { card: { _id: string; question: string; answer: string } },
      AxiosResponse<UpdateCardInfoType>
    >(`cards/card`, { card })
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
  created: Date
  grade: number
  more_id: string
  question: string
  rating: number
  shots: number
  type: string
  updated: Date
  user_id: string
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
