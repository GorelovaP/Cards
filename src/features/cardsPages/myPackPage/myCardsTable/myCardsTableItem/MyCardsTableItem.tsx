import React, { useState } from 'react'

import Skeleton from '@mui/material/Skeleton'

import { deleteCardTC } from '../../../../../app/cards-reducer'
import Delete from '../../../../../assets/images/table/Delete.svg'
import Edit from '../../../../../assets/images/table/Edit.svg'
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/appHooks'
import { CardsModal } from '../../../../../common/modals/cardsModal/CardsModal'
import { DeleteModal } from '../../../../../common/modals/deleteModal/DeleteModal'

import { MyItemGradeStars } from './myItemGradeStars/MyItemGradeStars'
import { StyledMyCardsTableItem } from './styledMyCardsTableItem'

type CardsTableItemType = {
  itemId: string
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  lastUpdated: string
  grade: number
}
export const MyCardsTableItem = (props: CardsTableItemType) => {
  const isLoading = useAppSelector(state => state.app.isLoading)

  const date = props.lastUpdated.toString().substring(0, 10).split('-').reverse().join('.')

  const [openCardsDeleteModal, setOpenCardsDeleteModal] = useState(false)
  const [openChangeCardsModal, setOpenChangeCardsModal] = useState(false)

  const dispatch = useAppDispatch()

  const setCardsDeleteModalClose = () => {
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
      <div className={'question'}>
        {!isLoading ? (
          <div className={'nameText'}>
            {props.questionImg && props.questionImg !== ' ' ? (
              <img className={'image'} src={props.questionImg} alt={'img'} />
            ) : (
              props.question
            )}
          </div>
        ) : (
          <Skeleton variant="rounded" height={16} width={'100%'} />
        )}
      </div>
      <div className={'answer'}>
        {!isLoading ? (
          <div className={'nameText'}>
            {props.answerImg && props.answerImg !== ' ' ? (
              <img className={'image'} src={props.answerImg} alt={'img'} />
            ) : (
              props.answer
            )}
          </div>
        ) : (
          <Skeleton variant="rounded" height={16} width={'100%'} />
        )}
      </div>
      <div className={'lastUpdated'}>
        {!isLoading ? date : <Skeleton variant="rounded" height={16} width={'90%'} />}
      </div>
      <div className={'grade'}>
        {!isLoading ? (
          <MyItemGradeStars grade={props.grade} />
        ) : (
          <Skeleton variant="rounded" height={16} width={'90%'} />
        )}
      </div>
      <div className={'options'}>
        {!isLoading ? (
          <>
            <img src={Edit} alt="" className={'edit'} onClick={onClickChangeHandler} />
            <img src={Delete} alt="" className={'delete'} onClick={onClickDeleteHandler} />
          </>
        ) : (
          <Skeleton variant="rounded" height={16} width={'100%'} />
        )}
      </div>
      {openCardsDeleteModal && (
        <DeleteModal
          title={'Delete Card'}
          open={openCardsDeleteModal}
          onClose={setCardsDeleteModalClose}
          onClick={deleteCard}
          name={props.question}
          cards={true}
          deckCover={props.questionImg}
        />
      )}
      {openChangeCardsModal && (
        <CardsModal
          open={openChangeCardsModal}
          onClose={setChangeCardsModalClose}
          initialAnswer={props.answer}
          initialQuestion={props.question}
          initialQuestionImg={props.questionImg}
          initialAnswerImg={props.answerImg}
          title={'Edit card'}
          cardId={props.itemId}
        />
      )}
    </StyledMyCardsTableItem>
  )
}
