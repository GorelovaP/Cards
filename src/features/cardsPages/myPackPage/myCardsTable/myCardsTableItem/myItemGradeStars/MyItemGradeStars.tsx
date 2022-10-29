import star1 from '../../../../../../assets/images/table/Star 1.svg'
import star4 from '../../../../../../assets/images/table/Star 4.svg'
import star5 from '../../../../../../assets/images/table/Star 5.svg'

import { StyledMyItemGradeStars } from './styledMyItemGradeStars'
type ItemGradeStarsPropsType = {
  grade: number
}
export const MyItemGradeStars = (props: ItemGradeStarsPropsType) => {
  return (
    <StyledMyItemGradeStars>
      <img src={star1} alt="" />
      <img src={star1} alt="" />
      <img src={star1} alt="" />
      <img src={star4} alt="" />
      <img src={star5} alt="" />
    </StyledMyItemGradeStars>
  )
}
