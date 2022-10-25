import Delete from '../../../../assets/images/table/Delete.svg'
import Edit from '../../../../assets/images/table/Edit.svg'
import Learn from '../../../../assets/images/table/teacher.svg'

import { StyledPacksListTableItem } from './styledPacksListTableItem'

export const PacksListTableItem = () => {
  return (
    <StyledPacksListTableItem>
      <div className={'name'}>Pack name</div>
      <div className={'cards'}>4</div>
      <div className={'lastUpdated'}>18.03.2021</div>
      <div className={'createdBy'}>Ivan Petrov</div>
      <div className={'actions'}>
        <img src={Learn} alt="" className={'learn'} />
        <img src={Edit} alt="" className={'edit'} />
        <img src={Delete} alt="" className={'delete'} />
      </div>
    </StyledPacksListTableItem>
  )
}
