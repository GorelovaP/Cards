import { useState } from 'react'

import arrow from '../../../../assets/images/table/Polygon 2.svg'

import { StyledCardsTableHeader } from './styledCardsTableHeader'

export const CardsTableHeader = () => {
  const [sort, setSort] = useState(true)

  const rotate = () => {
    setSort(!sort)
  }

  return (
    <StyledCardsTableHeader>
      <div className={'question'}>Question</div>
      <div className={'answer'}>Answer</div>
      <div className={'lastUpdated'} onClick={rotate}>
        Last Updated
        {sort ? <img src={arrow} alt="" /> : <img src={arrow} alt="" className={'reverse'} />}
      </div>
      <div className={'grade'}>Grade</div>
      <div className={'options'}></div>
    </StyledCardsTableHeader>
  )
}
