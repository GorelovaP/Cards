import { useState } from 'react'

import arrow from '../../../../assets/images/table/Polygon 2.svg'

import { StyledPacksListTableHeader } from './styledPacksListTableHeader'

export const PacksListTableHeader = () => {
  const [sort, setSort] = useState(true)

  const rotate = () => {
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
