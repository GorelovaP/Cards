import { useAppSelector } from '../../../app/hooks'

import { FriendsCardsTableHeader } from './FriendsCardsTableHeader/FriendaCardsTableHeader'
import { FriendsCardsTableItem } from './FriendsCardsTableItem/FriendsCardsTableItem'
import { StyledFriendsCardsTable } from './styledFriendsCardsTable'

export const FriendsCardsTable = () => {
  let cards = useAppSelector(state => state.cards.cards)

  return (
    <StyledFriendsCardsTable>
      <FriendsCardsTableHeader />
      {cards.map(item => {
        return (
          <FriendsCardsTableItem
            key={item._id}
            question={item.question}
            answer={item.answer}
            lastUpdated={item.updated}
            grade={item.grade}
          />
        )
      })}
    </StyledFriendsCardsTable>
  )
}
