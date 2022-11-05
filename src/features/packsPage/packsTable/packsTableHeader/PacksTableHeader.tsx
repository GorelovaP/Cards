import { sortUpdatedAC } from '../../../../app/pack-reducer'
import arrow from '../../../../assets/images/table/Polygon 2.svg'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/appHooks'

import { StyledPacksTableHeader } from './styledPacksTableHeader'

export const PacksTableHeader = () => {
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(state => state.app.isLoading)
  const sortSettings = useAppSelector(state => state.packs.sort)

  const sortLastUpdate = () => {
    if (isLoading) {
      return
    }
    dispatch(sortSettings === '1updated' ? sortUpdatedAC('0updated') : sortUpdatedAC('1updated'))
  }
  const sortCardsCount = () => {
    if (isLoading) {
      return
    }
    dispatch(
      sortSettings === '1cardsCount' ? sortUpdatedAC('0cardsCount') : sortUpdatedAC('1cardsCount')
    )
  }

  return (
    <StyledPacksTableHeader>
      <div className={'name'}>Name</div>
      <div className={'cards'} onClick={sortCardsCount}>
        Cards
        {sortSettings === '1cardsCount' ? (
          <img src={arrow} alt="" className={'reverse'} />
        ) : (
          <img src={arrow} alt="" />
        )}
      </div>
      <div className={'lastUpdated'} onClick={sortLastUpdate}>
        Last Updated
        {sortSettings === '1updated' ? (
          <img src={arrow} alt="" className={'reverse'} />
        ) : (
          <img src={arrow} alt="" />
        )}
      </div>
      <div className={'createdBy'}>Created by</div>
      <div className={'actions'}>Actions</div>
    </StyledPacksTableHeader>
  )
}
