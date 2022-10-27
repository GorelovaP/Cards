import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../app/hooks/hooks'
import { getPackTC, sortUpdatedAC } from '../../../../app/pack-reducer'
import arrow from '../../../../assets/images/table/Polygon 2.svg'

import { StyledPacksListTableHeader } from './styledPacksListTableHeader'

export const PacksListTableHeader = () => {
  const dispatch = useAppDispatch()
  const [sort, setSort] = useState(true)
  let userid = useAppSelector(state => state.user.user._id)
  let pageCount = useAppSelector(state => state.packs.pageCount) //сколько вмещает страница
  let currentItem = useAppSelector(state => state.packs.page) // выбранная страница
  let meOrAll = useAppSelector(state => state.packs.meOrAll)
  let maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  let minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const rotate = () => {
    if (!sort) {
      dispatch(sortUpdatedAC('0updated'))
      meOrAll === 'me'
        ? dispatch(
            getPackTC(
              undefined,
              minCardsCount,
              maxCardsCount,
              '0updated',
              currentItem,
              pageCount,
              userid
            )
          )
        : dispatch(
            getPackTC(undefined, minCardsCount, maxCardsCount, '0updated', currentItem, pageCount)
          )
    } else {
      dispatch(sortUpdatedAC('1updated'))
      meOrAll === 'me'
        ? dispatch(
            getPackTC(
              undefined,
              minCardsCount,
              maxCardsCount,
              '1updated',
              currentItem,
              pageCount,
              userid
            )
          )
        : dispatch(
            getPackTC(undefined, minCardsCount, maxCardsCount, '1updated', currentItem, pageCount)
          )
    }
    setSort(!sort)
  }

  return (
    <StyledPacksListTableHeader>
      <div className={'name'}>Name</div>
      <div className={'cards'}>Cards</div>
      <div className={'lastUpdated'} onClick={rotate}>
        Last Updated
        {sort ? <img src={arrow} alt="" /> : <img src={arrow} alt="" className={'reverse'} />}
      </div>
      <div className={'createdBy'}>Created by</div>
      <div className={'actions'}>Actions</div>
    </StyledPacksListTableHeader>
  )
}
