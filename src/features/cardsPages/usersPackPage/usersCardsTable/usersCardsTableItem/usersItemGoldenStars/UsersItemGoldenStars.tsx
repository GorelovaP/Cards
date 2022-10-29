import star1 from '../../../../../../assets/images/table/Star 1.svg'
import star4 from '../../../../../../assets/images/table/Star 4.svg'
import star5 from '../../../../../../assets/images/table/Star 5.svg'

import { StyledUsersItemGoldenStars } from './styledUsersItemGoldenStars'

type FriendsItemGoldenStarsPropsType = {
  grade: number
}
export const UsersItemGoldenStars = (props: FriendsItemGoldenStarsPropsType) => {
  return (
    <StyledUsersItemGoldenStars>
      <img src={star1} alt="star" />
      <img src={star1} alt="star" />
      <img src={star1} alt="star" />
      <img src={star4} alt="star" />
      <img src={star5} alt="star" />
    </StyledUsersItemGoldenStars>
  )
}
