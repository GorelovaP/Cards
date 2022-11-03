import React, { useState } from 'react'

import { deleteCardTC } from '../../../../../app/cards-reducer'
import Delete from '../../../../../assets/images/table/Delete.svg'
import Edit from '../../../../../assets/images/table/Edit.svg'
import { useAppDispatch } from '../../../../../common/hooks/appHooks'
import { CardsModal } from '../../../../../common/modals/cardsModal/CardsModal'
import { DeleteModal } from '../../../../../common/modals/deleteModal/DeleteModal'

import { MyItemGradeStars } from './myItemGradeStars/MyItemGradeStars'
import { StyledMyCardsTableItem } from './styledMyCardsTableItem'

type CardsTableItemType = {
  itemId: string
  question: string
  answer: string
  lastUpdated: string
  grade: number
}
export const MyCardsTableItem = (props: CardsTableItemType) => {
  const date = props.lastUpdated.toString().substring(0, 10).split('-').reverse().join('.')

  const [openCardsDeleteModal, setOpenCardsDeleteModal] = useState(false)
  const [openChangeCardsModal, setOpenChangeCardsModal] = useState(false)

  const dispatch = useAppDispatch()

  const setCardsDeleteModalClose = () => {
    console.log(props.itemId)
    setOpenCardsDeleteModal(false)
  }
  const onClickDeleteHandler = () => {
    setOpenCardsDeleteModal(true)
  }
  const deleteCard = () => {
    props.itemId && dispatch(deleteCardTC(props.itemId))
    setCardsDeleteModalClose()
  }

  const setChangeCardsModalClose = () => {
    setOpenChangeCardsModal(false)
  }
  const onClickChangeHandler = () => {
    setOpenChangeCardsModal(true)
  }

  return (
    <StyledMyCardsTableItem>
      <div className={'question'}>{props.question}</div>
      <div className={'answer'}>{props.answer}</div>
      <div className={'lastUpdated'}>{date}</div>
      <div className={'grade'}>
        <MyItemGradeStars grade={props.grade} />
      </div>
      <div className={'options'}>
        <img src={Edit} alt="" className={'edit'} onClick={onClickChangeHandler} />{' '}
        <img src={Delete} alt="" className={'delete'} onClick={onClickDeleteHandler} />
      </div>
      {openCardsDeleteModal && (
        <DeleteModal
          open={openCardsDeleteModal}
          onClose={setCardsDeleteModalClose}
          onClick={deleteCard}
          name={props.question}
        />
      )}
      {openChangeCardsModal && (
        <CardsModal
          open={openChangeCardsModal}
          onClose={setChangeCardsModalClose}
          initialAnswer={props.answer}
          initialQuestion={props.question}
          title={'Edit card'}
          cardId={props.itemId}
        />
      )}
    </StyledMyCardsTableItem>
  )
}
