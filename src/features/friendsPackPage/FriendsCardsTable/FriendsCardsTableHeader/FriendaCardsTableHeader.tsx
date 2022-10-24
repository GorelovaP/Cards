import { useState } from 'react'

import arrow from '../../../../assets/images/table/Polygon 2.svg'

import { StyledFriendsCardsTableHeader } from './styledFriendsCardsTableHeader'

export const FriendsCardsTableHeader = () => {
  const [sort, setSort] = useState(true)

  const rotate = () => {
    setSort(!sort)
  }

  return (
    <StyledFriendsCardsTableHeader>
      <div className={'question'}>Question</div>
      <div className={'answer'}>Answer</div>
      <div className={'lastUpdated'} onClick={rotate}>
        Last Updated
        {sort ? <img src={arrow} alt="" /> : <img src={arrow} alt="" className={'reverse'} />}
      </div>
      <div className={'grade'}>Grade</div>
    </StyledFriendsCardsTableHeader>
  )
}
