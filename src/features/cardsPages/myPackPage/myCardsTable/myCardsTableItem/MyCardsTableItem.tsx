import Delete from '../../../../../assets/images/table/Delete.svg'
import Edit from '../../../../../assets/images/table/Edit.svg'

import { MyItemGradeStars } from './myItemGradeStars/MyItemGradeStars'
import { StyledMyCardsTableItem } from './styledMyCardsTableItem'

type CardsTableItemType = {
  question: string
  answer: string
  lastUpdated: Date
  grade: number
  updateCardInfo: () => void
  deleteCard: () => void
}
export const MyCardsTableItem = (props: CardsTableItemType) => {
  let date = props.lastUpdated.toString().substring(0, 10).split('-').reverse().join('.')

  return (
    <StyledMyCardsTableItem>
      <div className={'question'}>{props.question}</div>
      <div className={'answer'}>{props.answer}</div>
      <div className={'lastUpdated'}>{date}</div>
      <div className={'grade'}>
        <MyItemGradeStars grade={props.grade} />
      </div>
      <div className={'options'}>
        <img src={Edit} alt="" className={'edit'} onClick={props.updateCardInfo} />{' '}
        <img src={Delete} alt="" className={'delete'} onClick={props.deleteCard} />
      </div>
    </StyledMyCardsTableItem>
  )
}
