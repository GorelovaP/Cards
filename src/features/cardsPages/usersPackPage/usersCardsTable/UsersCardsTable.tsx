import { useAppSelector } from '../../../../common/hooks/appHooks'

import { StyledUsersCardsTable } from './styledUsersCardsTable'
import { FriendsCardsTableHeader } from './usersCardsTableHeader/UsersCardsTableHeader'
import { UsersCardsTableItem } from './usersCardsTableItem/UsersCardsTableItem'

export const UsersCardsTable = () => {
  let cards = useAppSelector(state => state.cards.cards)

  return (
    <StyledUsersCardsTable>
      <FriendsCardsTableHeader />
      {cards.map(item => {
        return (
          <UsersCardsTableItem
            key={item._id}
            question={item.question}
            answer={item.answer}
            questionImg={item.questionImg}
            answerImg={item.answerImg}
            lastUpdated={item.updated}
            grade={item.grade}
          />
        )
      })}
    </StyledUsersCardsTable>
  )
}
