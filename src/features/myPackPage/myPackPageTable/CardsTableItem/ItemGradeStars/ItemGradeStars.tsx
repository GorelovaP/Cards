import star1 from '../../../../../assets/images/table/Star 1.svg'
import star4 from '../../../../../assets/images/table/Star 4.svg'
import star5 from '../../../../../assets/images/table/Star 5.svg'

import { StyledItemGradeStars } from './styledItemGradeStars'
type ItemGradeStarsPropsType = {
  grade: number
}
export const ItemGradeStars = (props: ItemGradeStarsPropsType) => {
  return (
    <StyledItemGradeStars>
      <img src={star1} alt="" />
      <img src={star1} alt="" />
      <img src={star1} alt="" />
      <img src={star4} alt="" />
      <img src={star5} alt="" />
    </StyledItemGradeStars>
  )
}
