import React, { useState } from 'react'

import { useFormik } from 'formik'

import { addNewCardTC, updateCardInfoTC } from '../../../../app/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/appHooks'
import { StyledButton } from '../../../styledComponents/styledButtons'
import { InputTypeFile } from '../../uploadInput/UploadInput'

type PropsType = {
  initialQuestionImg?: string
  initialAnswerImg?: string
  cardId?: string
  onClose: () => void
}

export const ImgForm = (props: PropsType) => {
  const chosenPack = useAppSelector(state => state.packs.chosenPack)
  const isLoading = useAppSelector(state => state.app.isLoading)

  const [coverPicQuestion, setCoverPicQuestion] = useState(props.initialQuestionImg || '')
  const [coverPicAnswer, setCoverPicAnswer] = useState(props.initialAnswerImg || '')

  const dispatch = useAppDispatch()

  const formikImg = useFormik({
    initialValues: {
      questionImg: props.initialQuestionImg,
      answerImg: props.initialAnswerImg,
    },
    onSubmit: () => {
      if (
        coverPicQuestion === props.initialQuestionImg &&
        coverPicAnswer === props.initialAnswerImg
      ) {
        return props.onClose()
      }

      !props.initialQuestionImg
        ? dispatch(
            addNewCardTC({
              cardsPack_id: chosenPack,
              question: ' ',
              answer: ' ',
              questionImg: coverPicQuestion,
              answerImg: coverPicAnswer,
            })
          )
        : dispatch(
            updateCardInfoTC({
              _id: props.cardId!,
              question: ' ',
              answer: ' ',
              questionImg: coverPicQuestion,
              answerImg: coverPicAnswer,
            })
          )
      props.onClose()
    },
  })

  return (
    <form onSubmit={formikImg.handleSubmit}>
      <InputTypeFile
        getCoverHandler={cover => setCoverPicQuestion(cover)}
        imgName={'Question'}
        coverPic={coverPicQuestion}
      />
      <InputTypeFile
        getCoverHandler={cover => setCoverPicAnswer(cover)}
        imgName={'Answer'}
        coverPic={coverPicAnswer}
      />
      <div className={'buttonsContainer'}>
        <StyledButton className={'cancel'} onClick={props.onClose}>
          Cancel
        </StyledButton>
        <StyledButton className={'save'} type="submit" disabled={isLoading}>
          Save
        </StyledButton>
      </div>
    </form>
  )
}
