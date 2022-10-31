import { setSortSettingsAC } from '../../../../../app/cards-reducer'
import arrow from '../../../../../assets/images/table/Polygon 2.svg'
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/appHooks'

import { StyledMyCardsTableHeader } from './styledMyCardsTableHeader'

export const MyCardsTableHeader = () => {
  let sortSettings = useAppSelector(state => state.cards.sortSettings)

  const dispatch = useAppDispatch()

  const getSortCards = () => {
    sortSettings === '1updated'
      ? dispatch(setSortSettingsAC('0updated'))
      : dispatch(setSortSettingsAC('1updated'))
  }

  return (
    <StyledMyCardsTableHeader>
      <div className={'question'}>Question</div>
      <div className={'answer'}>Answer</div>
      <div className={'lastUpdated'} onClick={getSortCards}>
        Last Updated
        {sortSettings === '0updated' ? (
          <img src={arrow} alt="" />
        ) : (
          <img src={arrow} alt="" className={'reverse'} />
        )}
      </div>
      <div className={'grade'}>Grade</div>
      <div className={'options'}></div>
    </StyledMyCardsTableHeader>
  )
}
