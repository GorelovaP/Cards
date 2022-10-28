import { StyledFriendsCardsTableItem } from './styledFriendsCardsTableItem'
import { FriendsItemGoldenStars } from './usersItemGoldenStars/FriendsItemGoldenStars'

type FriendsCardsTableItemPropsType = {
  question: string
  answer: string
  lastUpdated: Date
  grade: number
}

export const FriendsCardsTableItem = (props: FriendsCardsTableItemPropsType) => {
  let date = props.lastUpdated.toString().substring(0, 10).split('-').reverse().join('.')

  return (
    <StyledFriendsCardsTableItem>
      <div className={'question'}>{props.question}</div>
      <div className={'answer'}>{props.answer}</div>
      <div className={'lastUpdated'}>{date}</div>
      <div className={'grade'}>
        <FriendsItemGoldenStars grade={props.grade} />
      </div>
    </StyledFriendsCardsTableItem>
  )
}
