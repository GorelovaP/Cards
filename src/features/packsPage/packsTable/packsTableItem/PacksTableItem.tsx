import React, { useState } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useNavigate } from 'react-router-dom'

import {
  chosenPackAC,
  deletePackTC,
  setLocalStorageChosenPackTC,
} from '../../../../app/pack-reducer'
import { PATH } from '../../../../app/routes/PagesRoutes'
import Delete from '../../../../assets/images/table/Delete.svg'
import Edit from '../../../../assets/images/table/Edit.svg'
import Learn from '../../../../assets/images/table/teacher.svg'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/appHooks'
import { DeleteModal } from '../../../../common/modals/deleteModal/DeleteModal'
import { EditPackNameModal } from '../../packsModal/editPackNameModal/EditPackNameModal'

import noCover from './../../../../assets/images/table/noCover.jpg'
import { StyledPacksTableItem } from './styledPacksTableItem'

type PacksListTableItemPropsType = {
  _id?: string
  userId: string
  cardsPack_id: string
  name: string
  cards: number
  lastUpdated: Date
  userName: string
  deckCover: string
  onClickHandler: () => void
  private: boolean
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
    dispatch(setLocalStorageChosenPackTC(props.cardsPack_id))
    navigate(PATH.LEARN)
  }

  return (
    <StyledPacksTableItem>
      {!isLoading ? (
        <div className={'name'} onClick={props.onClickHandler}>
          <div className={'packImage'}>
            <img src={props.deckCover ? props.deckCover : noCover} alt={'img'} />
          </div>
          <div className={'nameText'}>{props.name}</div>
        </div>
      ) : (
        <div className={'name'}>
          <Skeleton variant="rounded" height={16} width={'100%'} />
        </div>
      )}
      <div className={'cards'}>
        {!isLoading ? props.cards : <Skeleton variant="rounded" height={16} width={'90%'} />}
      </div>
      <div className={'lastUpdated'}>
        {' '}
        {!isLoading ? date : <Skeleton variant="rounded" height={16} width={'90%'} />}
      </div>
      <div className={'createdBy'}>
        {!isLoading ? props.userName : <Skeleton variant="rounded" height={16} width={'100%'} />}
      </div>
      <div className={'actions'}>
        {isLoading ? (
          <Skeleton variant="rounded" height={16} width={'100%'} />
        ) : (
          <>
            {' '}
            {props.userId === loginUserId && (
              <>
                <img src={Edit} alt="" className={'edit'} onClick={onClickEditHandler} />
                <img src={Delete} alt="" className={'delete'} onClick={onClickDeleteHandler} />
              </>
            )}
            {props.cards > 0 ? (
              <img src={Learn} alt="" className={'learn'} onClick={goToLearnPage} />
            ) : (
              <img src={Learn} alt="" className={'learnIsRestricted'} />
            )}
          </>
        )}
      </div>
      {openPacksModal && (
        <DeleteModal
          title={'Delete Pack'}
          open={openPacksModal}
          onClose={setPacksModalClose}
          onClick={deletePack}
          name={props.name}
          deckCover={props.deckCover}
        />
      )}
      {openEditPacksNameModal && (
        <EditPackNameModal
          open={openEditPacksNameModal}
          onClose={setEditPacksNameModalClose}
          name={props.name}
          private={props.private}
          id={props.cardsPack_id}
          deckCover={props.deckCover}
        />
      )}
    </StyledPacksTableItem>
  )
}
