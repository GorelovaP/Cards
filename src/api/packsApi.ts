import { AxiosResponse } from 'axios'

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

    return instance.get<ParamsType, AxiosResponse<CommonPackType>>(`cards/pack`, { params })
  },
  addPack(cardsPack: { name?: string }) {
    return instance.post<{ cardsPack: { name?: string } }, AxiosResponse<NewCardsPackType>>(
      `cards/pack`,
      { cardsPack }
    )
  },
  deletePack(packId: string) {
    return instance.delete<{ packId: string }, AxiosResponse<DeletePackType>>(
      `cards/pack?id=${packId}`
    )
  },
  updatePackName(cardsPack: { _id: string; name?: string }) {
    return instance.put<
      { cardsPack: { _id: string; name?: string } },
      AxiosResponse<UpdatePackNameType>
    >(`cards/pack`, { cardsPack })
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
  token: string
  tokenDeathTime: number
}
export type PackType = {
  cardsCount: number
  created: string
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: Date
  user_id: string
  user_name: string
  __v: number
  _id: string
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

type ParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}
