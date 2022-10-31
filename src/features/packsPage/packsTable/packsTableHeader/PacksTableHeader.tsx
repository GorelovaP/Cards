import { useEffect, useState } from 'react'

import { sortType, sortUpdatedAC } from '../../../../app/pack-reducer'
import arrow from '../../../../assets/images/table/Polygon 2.svg'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/appHooks'

import { StyledPacksTableHeader } from './styledPacksTableHeader'

export const PacksTableHeader = () => {
  const dispatch = useAppDispatch()

  let sortSettings = useAppSelector(state => state.packs.sort)

  const [sort, setSort] = useState<sortType>(sortSettings)

  useEffect(() => {
    setSort(sortSettings)
  }, [sortSettings])

  const rotate = () => {
    sort === '1updated' ? dispatch(sortUpdatedAC('0updated')) : dispatch(sortUpdatedAC('1updated'))
  }

  return (
    <StyledPacksTableHeader>
      <div className={'name'}>Name</div>
      <div className={'cards'}>Cards</div>
      <div className={'lastUpdated'} onClick={rotate}>
        Last Updated
        {sort === '0updated' ? (
          <img src={arrow} alt="" />
        ) : (
          <img src={arrow} alt="" className={'reverse'} />
        )}
      </div>
      <div className={'createdBy'}>Created by</div>
      <div className={'actions'}>Actions</div>
    </StyledPacksTableHeader>
  )
}
