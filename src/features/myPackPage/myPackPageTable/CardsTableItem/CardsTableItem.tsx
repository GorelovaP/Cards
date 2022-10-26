import Delete from '../../../../assets/images/table/Delete.svg'
import Edit from '../../../../assets/images/table/Edit.svg'

import { ItemGradeStars } from './ItemGradeStars/ItemGradeStars'
import { StyledCardsTableItem } from './styledCardsTableItem'

type CardsTableItemType = {
  question: string
  answer: string
  lastUpdated: Date
  grade: number
}
export const CardsTableItem = (props: CardsTableItemType) => {
  let date = props.lastUpdated.toString().substring(0, 10).split('-').reverse().join('.')

  return (
    <StyledCardsTableItem>
      <div className={'question'}>{props.question}</div>
      <div className={'answer'}>{props.answer}</div>
      <div className={'lastUpdated'}>{date}</div>
      <div className={'grade'}>
        <ItemGradeStars grade={props.grade} />
      </div>
      <div className={'options'}>
        <img src={Edit} alt="" className={'edit'} />{' '}
        <img src={Delete} alt="" className={'delete'} />
      </div>
    </StyledCardsTableItem>
  )
}
