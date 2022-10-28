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

    return instance.get<getCardsResponseType>(`cards/card`, { params })
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
    return instance.post<NewCardsType>(`cards/card`, { card })
  },
  deleteCard(id: string) {
    return instance.delete<DeletedCardType>(`cards/card?id=${id}`)
  },
  updateCardInfo(card: { _id: string; question: string; answer: string }) {
    return instance.put<UpdateCardInfoType>(`cards/card`, { card })
  },
}

// =============== Types for Cards API ==============
export type getCardsResponseType = {
  cards: CardsType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
}
export type CardsType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: Date
  updated: Date
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
