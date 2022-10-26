import { useAppSelector } from '../../../../app/hooks'
import Delete from '../../../../assets/images/table/Delete.svg'
import Edit from '../../../../assets/images/table/Edit.svg'
import Learn from '../../../../assets/images/table/teacher.svg'

import { StyledPacksListTableItem } from './styledPacksListTableItem'

type PacksListTableItemPropsType = {
  _id?: string
  userId: string
  name: string
  cards: number
  lastUpdated: Date
  userName: string
}
export const PacksListTableItem = (props: PacksListTableItemPropsType) => {
  let loginUserId = useAppSelector(state => state.user.user._id)

  let date = props.lastUpdated.toString().substring(0, 10).split('-').reverse().join('.')

  return (
    <StyledPacksListTableItem>
      <div className={'name'}>{props.name}</div>
      <div className={'cards'}>{props.cards}</div>
      <div className={'lastUpdated'}>{date}</div>
      <div className={'createdBy'}>{props.userName}</div>
      <div className={'actions'}>
        <img src={Learn} alt="" className={'learn'} />
        {props.userId === loginUserId && (
          <>
            <img src={Edit} alt="" className={'edit'} />
            <img src={Delete} alt="" className={'delete'} />
          </>
        )}
      </div>
    </StyledPacksListTableItem>
  )
}
