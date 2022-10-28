import { instance } from './appApi'

export const packsAPI = {
  getPack(
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number,
    user_id?: string,
    block?: boolean
  ) {
    const params = {
      packName,
      min,
      max,
      sortPacks,
      page,
      pageCount,
      user_id,
      block,
    }

    return instance.get<CommonPackType>(`cards/pack`, { params })
  },
  addPack(cardsPack: { name?: string }) {
    return instance.post<NewCardsPackType>(`cards/pack`, { cardsPack })
  },
  deletePack(packId: string) {
    return instance.delete<DeletePackType>(`cards/pack?id=${packId}`)
  },
  updatePackName(cardsPack: { _id: string; name?: string }) {
    return instance.put<UpdatePackNameType>(`cards/pack`, { cardsPack })
  },
}

// =============== Types for Packs API ==============
export type CommonPackType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}
export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: Date
  updated: Date
  user_name: string
}
export type NewCardsPackType = {
  newCardsPack: PackType
}
export type DeletePackType = {
  deletedCardsPack: PackType
}

export type UpdatePackNameType = {
  updatedCardsPack: PackType
}
