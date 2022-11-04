import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { chosenPackAC, deletePackTC } from '../../../../app/pack-reducer'
import { PATH } from '../../../../app/routes/PagesRoutes'
import Delete from '../../../../assets/images/table/Delete.svg'
import Edit from '../../../../assets/images/table/Edit.svg'
import Learn from '../../../../assets/images/table/teacher.svg'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/appHooks'
import { DeleteModal } from '../../../../common/modals/deleteModal/DeleteModal'
import { EditPackNameModal } from '../../packsModal/editPackNameModal/EditPackNameModal'

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
}
export const PacksTableItem = (props: PacksListTableItemPropsType) => {
  const loginUserId = useAppSelector(state => state.user.user._id)
  const isLoading = useAppSelector(state => state.app.isLoading)

  const [openPacksModal, setOpenPacksModal] = useState(false)
  const [openEditPacksNameModal, setOpenEditPacksNameModal] = useState(false)
  const date = props.lastUpdated.toString().substring(0, 10).split('-').reverse().join('.')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const setPacksModalClose = () => {
    setOpenPacksModal(false)
  }

  const setEditPacksNameModalClose = () => {
    setOpenEditPacksNameModal(false)
  }

  const onClickDeleteHandler = () => {
    setOpenPacksModal(true)
  }

  const onClickEditHandler = () => {
    setOpenEditPacksNameModal(true)
  }

  const deletePack = () => {
    dispatch(deletePackTC(props.cardsPack_id))
    setPacksModalClose()
  }
  const goToLearnPage = () => {
    dispatch(chosenPackAC(props.cardsPack_id))
    navigate(PATH.LEARN)
  }

  return (
    <StyledPacksTableItem>
      {!isLoading ? (
        <div className={'name'} onClick={props.onClickHandler}>
          {props.name}
        </div>
      ) : (
        <div className={'name'}>{props.name}</div>
      )}
      <div className={'cards'}>{props.cards}</div>
      <div className={'lastUpdated'}>{date}</div>
      <div className={'createdBy'}>{props.userName}</div>
      <div className={'actions'}>
        {props.cards > 0 && !isLoading ? (
          <img src={Learn} alt="" className={'learn'} onClick={goToLearnPage} />
        ) : (
          <img src={Learn} alt="" className={'learnIsRestricted'} />
        )}
        {props.userId === loginUserId && (
          <>
            {!isLoading ? (
              <img src={Edit} alt="" className={'edit'} onClick={onClickEditHandler} />
            ) : (
              <img src={Edit} alt="" className={'editIsRestricted'} />
            )}
            {!isLoading ? (
              <img src={Delete} alt="" className={'delete'} onClick={onClickDeleteHandler} />
            ) : (
              <img src={Delete} alt="" className={'deleteIsRestricted'} />
            )}
          </>
        )}
      </div>
      {openPacksModal && (
        <DeleteModal
          open={openPacksModal}
          onClose={setPacksModalClose}
          onClick={deletePack}
          name={props.name}
        />
      )}
      {openEditPacksNameModal && (
        <EditPackNameModal
          open={openEditPacksNameModal}
          onClose={setEditPacksNameModalClose}
          name={props.name}
          id={props.cardsPack_id}
        />
      )}
    </StyledPacksTableItem>
  )
}
