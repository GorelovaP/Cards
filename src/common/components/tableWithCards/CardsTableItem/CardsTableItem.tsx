import Delete from './../../../../assets/images/table/Delete.svg'
import Edit from './../../../../assets/images/table/Edit.svg'
import { ItemGradeStars } from './ItemGradeStars/ItemGradeStars'
import { StyledCardsTableItem } from './styledCardsTableItem'

export const CardsTableItem = () => {
  return (
    <StyledCardsTableItem>
      <div className={'question'}>How &quot;This&quot; works in JavaScript?</div>
      <div className={'answer'}>This is how This works in JavaScript</div>
      <div className={'lastUpdated'}>19.03.2022</div>
      <div className={'grade'}>
        <ItemGradeStars />
      </div>
      <div className={'options'}>
        <img src={Edit} alt="" className={'edit'} />{' '}
        <img src={Delete} alt="" className={'delete'} />
      </div>
    </StyledCardsTableItem>
  )
}
