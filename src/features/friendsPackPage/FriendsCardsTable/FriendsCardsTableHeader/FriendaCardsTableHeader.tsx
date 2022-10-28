import { useEffect, useState } from 'react'

import { getCardsTC } from '../../../../app/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/hooks'
import { sortUpdatedAC } from '../../../../app/pack-reducer'
import arrow from '../../../../assets/images/table/Polygon 2.svg'

import { StyledFriendsCardsTableHeader } from './styledFriendsCardsTableHeader'

export const FriendsCardsTableHeader = () => {
  let sortSettings = useAppSelector(state => state.packs.sort)
  const chosenPack = useAppSelector(state => state.packs.chosenPack)
  const currentItem = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const searchData = useAppSelector(state => state.packs.searchData)

  const [sort, setSort] = useState(sortSettings)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setSort(sortSettings)
  }, [sortSettings])

  const rotate = () => {
    if (sort === '1updated') {
      dispatch(sortUpdatedAC('0updated'))
      dispatch(
        getCardsTC(
          undefined,
          searchData,
          chosenPack,
          undefined,
          undefined,
          '0updated',
          currentItem,
          pageCount
        )
      )
    } else {
      dispatch(sortUpdatedAC('1updated'))
      dispatch(
        getCardsTC(
          undefined,
          searchData,
          chosenPack,
          undefined,
          undefined,
          '1updated',
          currentItem,
          pageCount
        )
      )
    }
  }

  return (
    <StyledFriendsCardsTableHeader>
      <div className={'question'}>Question</div>
      <div className={'answer'}>Answer</div>
      <div className={'lastUpdated'} onClick={rotate}>
        Last Updated
        {sort === '0updated' ? (
          <img src={arrow} alt="" />
        ) : (
          <img src={arrow} alt="" className={'reverse'} />
        )}
      </div>
      <div className={'grade'}>Grade</div>
    </StyledFriendsCardsTableHeader>
  )
}
