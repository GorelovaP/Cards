import { setSortSettingsAC } from '../../../../../app/cards-reducer'
import arrow from '../../../../../assets/images/table/Polygon 2.svg'
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/appHooks'

import { StyledUsersCardsTableHeader } from './styledUsersCardsTableHeader'

export const FriendsCardsTableHeader = () => {
  let sortSettings = useAppSelector(state => state.cards.sortSettings)

  const dispatch = useAppDispatch()

  const rotate = () => {
    sortSettings === '1updated'
      ? dispatch(setSortSettingsAC('0updated'))
      : dispatch(setSortSettingsAC('1updated'))
  }

  return (
    <StyledUsersCardsTableHeader>
      <div className={'question'}>Question</div>
      <div className={'answer'}>Answer</div>
      <div className={'lastUpdated'} onClick={rotate}>
        Last Updated
        {sortSettings === '0updated' ? (
          <img src={arrow} alt="" />
        ) : (
          <img src={arrow} alt="" className={'reverse'} />
        )}
      </div>
      <div className={'grade'}>Grade</div>
    </StyledUsersCardsTableHeader>
  )
}
