import { FriendsItemGoldenStars } from './FriendsItemGoldenStars/FriendsItemGoldenStars'
import { StyledFriendsCardsTableItem } from './styledFriendsCardsTableItem'

export const FriendsCardsTableItem = () => {
  return (
    <StyledFriendsCardsTableItem>
      <div className={'question'}>How &quot;This&quot; works in JavaScript?</div>
      <div className={'answer'}>This is how This works in JavaScript</div>
      <div className={'lastUpdated'}>19.03.2022</div>
      <div className={'grade'}>
        <FriendsItemGoldenStars />
      </div>
    </StyledFriendsCardsTableItem>
  )
}
