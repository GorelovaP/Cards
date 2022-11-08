import React from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { addNewCardTC, updateCardInfoTC } from '../../../../app/cards-reducer'
import { MyInput } from '../../../components/styledInput/MyInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/appHooks'
import { StyledButton } from '../../../styledComponents/styledButtons'
import { StyledErrorArea } from '../../../styledComponents/styledErrorArea'

type propsType = {
  initialQuestion?: string
  initialAnswer?: string
  onClose: () => void
  cardId?: string
}

export const TextForm = (props: propsType) => {
  const dispatch = useAppDispatch()
  const chosenPack = useAppSelector(state => state.packs.chosenPack)
  const isLoading = useAppSelector(state => state.app.isLoading)

  const formikText = useFormik({
    validationSchema: Yup.object({
      question: Yup.string().min(2).max(100).required('* field is required'),
      answer: Yup.string().min(1).max(100).required('* field is required'),
    }),
    initialValues: {
      question: props.initialQuestion,
      answer: props.initialAnswer,
    },
    onSubmit: values => {
      const { question, answer } = values

      if (question === props.initialQuestion && answer === props.initialAnswer) {
        return props.onClose()
      }

      props.initialAnswer === ''
        ? dispatch(
            addNewCardTC({
              cardsPack_id: chosenPack,
              question: question,
              answer: answer,
            })
          )
        : dispatch(
            updateCardInfoTC({
              _id: props.cardId!,
              question: question,
              answer: answer,
              questionImg: ' ',
              answerImg: ' ',
            })
          )
      props.onClose()
    },
  })

  return (
    <form onSubmit={formikText.handleSubmit}>
      <div className={'inputErrorHandlerForm'}>
        <MyInput
          text={'text'}
          label={'Question'}
          maxLength={100}
          placeholder={'Enter question'}
          {...formikText.getFieldProps('question')}
        />
        <div className={'formErrorPlacement'}>
          {formikText.errors.question && formikText.touched.question ? (
            <StyledErrorArea>{formikText.errors.question}</StyledErrorArea>
          ) : null}
          {formikText.values.question!.length > 100 ? (
            <StyledErrorArea>{'max length is 100 symbols'}</StyledErrorArea>
          ) : null}
        </div>
        <MyInput
          text={'text'}
          label={'Answer'}
          maxLength={100}
          placeholder={'Enter answer'}
          {...formikText.getFieldProps('answer')}
        />
        <div className={'formErrorPlacement'}>
          {formikText.errors.answer && formikText.touched.answer ? (
            <StyledErrorArea>{formikText.errors.answer}</StyledErrorArea>
          ) : null}
          {formikText.values.answer!.length > 100 ? (
            <StyledErrorArea>{'max length is 100 symbols'}</StyledErrorArea>
          ) : null}
        </div>
      </div>
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
