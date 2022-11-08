import React, { useEffect, useState } from 'react'

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

  const [errorQuestion, setErrorQuestion] = useState('')
  const [errorAnswer, setErrorAnswer] = useState('')

  const dispatch = useAppDispatch()

  useEffect(() => {
    setErrorAnswer('')
  }, [coverPicAnswer])

  useEffect(() => {
    setErrorQuestion('')
  }, [coverPicQuestion])

  const formikImg = useFormik({
    initialValues: {
      questionImg: props.initialQuestionImg,
      answerImg: props.initialAnswerImg,
    },
    onSubmit: (values, actions) => {
      if (
        coverPicQuestion === props.initialQuestionImg &&
        coverPicAnswer === props.initialAnswerImg
      ) {
        return props.onClose()
      }

      if (!props.initialQuestionImg) {
        if (coverPicQuestion === '') {
          actions.setSubmitting(false)
          setErrorQuestion('* field is required ')

          return
        }
        if (coverPicAnswer === '') {
          setErrorAnswer('* field is required ')
          actions.setSubmitting(false)

          return
        }

        dispatch(
          addNewCardTC({
            cardsPack_id: chosenPack,
            question: ' ',
            answer: ' ',
            questionImg: coverPicQuestion,
            answerImg: coverPicAnswer,
          })
        )
      } else {
        dispatch(
          updateCardInfoTC({
            _id: props.cardId!,
            question: ' ',
            answer: ' ',
            questionImg: coverPicQuestion,
            answerImg: coverPicAnswer,
          })
        )
      }
      setErrorQuestion('')
      setErrorAnswer('')
      props.onClose()
    },
  })

  return (
    <form
      onSubmit={formikImg.handleSubmit}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          formikImg.handleSubmit()
        }
      }}
    >
      <InputTypeFile
        getCoverHandler={cover => setCoverPicQuestion(cover)}
        imgName={'Question'}
        coverPic={coverPicQuestion}
      />
      {errorQuestion && <p className={'error'}>{errorQuestion}</p>}
      <InputTypeFile
        getCoverHandler={cover => setCoverPicAnswer(cover)}
        imgName={'Answer'}
        coverPic={coverPicAnswer}
      />
      {errorAnswer && <p className={'error'}>{errorAnswer}</p>}
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
