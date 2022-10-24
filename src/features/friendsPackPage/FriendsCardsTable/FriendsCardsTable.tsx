import { FriendsCardsTableHeader } from './FriendsCardsTableHeader/FriendaCardsTableHeader'
import { FriendsCardsTableItem } from './FriendsCardsTableItem/FriendsCardsTableItem'
import { StyledFriendsCardsTable } from './styledFriendsCardsTable'

export const FriendsCardsTable = () => {
  return (
    <StyledFriendsCardsTable>
      <FriendsCardsTableHeader />
      <FriendsCardsTableItem />
      <FriendsCardsTableItem />
      <FriendsCardsTableItem />
      <FriendsCardsTableItem />
      <FriendsCardsTableItem />
      <FriendsCardsTableItem />
    </StyledFriendsCardsTable>
  )
}
