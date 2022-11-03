import { StyledUsersCardsTableItem } from './styledUsersCardsTableItem'
import { UsersItemGoldenStars } from './usersItemGoldenStars/UsersItemGoldenStars'

type FriendsCardsTableItemPropsType = {
  question: string
  answer: string
  lastUpdated: string
  grade: number
}

export const UsersCardsTableItem = (props: FriendsCardsTableItemPropsType) => {
  let date = props.lastUpdated.toString().substring(0, 10).split('-').reverse().join('.')

  return (
    <StyledUsersCardsTableItem>
      <div className={'question'}>{props.question}</div>
      <div className={'answer'}>{props.answer}</div>
      <div className={'lastUpdated'}>{date}</div>
      <div className={'grade'}>
        <UsersItemGoldenStars grade={props.grade} />
      </div>
    </StyledUsersCardsTableItem>
  )
}
