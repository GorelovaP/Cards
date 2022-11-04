import { setSortSettingsAC } from '../../../../../app/cards-reducer'
import arrow from '../../../../../assets/images/table/Polygon 2.svg'
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/appHooks'

import { StyledUsersCardsTableHeader } from './styledUsersCardsTableHeader'

export const FriendsCardsTableHeader = () => {
  const sortSettings = useAppSelector(state => state.cards.sortSettings)
  const isLoading = useAppSelector(state => state.app.isLoading)

  const dispatch = useAppDispatch()

  const rotate = () => {
    if (isLoading) {
      return
    }
    dispatch(
      sortSettings === '1updated' ? setSortSettingsAC('0updated') : setSortSettingsAC('1updated')
    )
  }

  return (
    <StyledUsersCardsTableHeader>
      <div className={'question'}>Question</div>
      <div className={'answer'}>Answer</div>
      <div className={'lastUpdated '} onClick={rotate}>
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
