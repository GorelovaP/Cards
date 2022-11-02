import React, { useState } from 'react'

import Delete from '../../../../assets/images/table/Delete.svg'
import Edit from '../../../../assets/images/table/Edit.svg'
import Learn from '../../../../assets/images/table/teacher.svg'
import { useAppSelector } from '../../../../common/hooks/appHooks'
import { DeletePackModal } from '../../packsModal/deletePackModal/DeletePackModal'

import { StyledPacksTableItem } from './styledPacksTableItem'

type PacksListTableItemPropsType = {
  _id?: string
  userId: string
  cardsPack_id: string
  name: string
  cards: number
  lastUpdated: Date
  userName: string
  onClickHandler: () => void
  updatePackName: () => void
}
export const PacksTableItem = (props: PacksListTableItemPropsType) => {
  let loginUserId = useAppSelector(state => state.user.user._id)
  let date = props.lastUpdated.toString().substring(0, 10).split('-').reverse().join('.')
  const [openPacksModal, setOpenPacksModal] = useState(false)

  const setPacksModalClose = () => {
    setOpenPacksModal(false)
  }

  const onClickDeleteHandler = () => {
    setOpenPacksModal(true)
  }

  return (
    <StyledPacksTableItem>
      <div className={'name'} onClick={props.onClickHandler}>
        {props.name}
      </div>
      <div className={'cards'}>{props.cards}</div>
      <div className={'lastUpdated'}>{date}</div>
      <div className={'createdBy'}>{props.userName}</div>
      <div className={'actions'}>
        <img src={Learn} alt="" className={'learn'} />
        {props.userId === loginUserId && (
          <>
            <img src={Edit} alt="" className={'edit'} onClick={props.updatePackName} />
            <img src={Delete} alt="" className={'delete'} onClick={onClickDeleteHandler} />
          </>
        )}
      </div>
      {openPacksModal && (
        <DeletePackModal
          open={openPacksModal}
          onClose={setPacksModalClose}
          packId={props.cardsPack_id}
        />
      )}
    </StyledPacksTableItem>
  )
}
