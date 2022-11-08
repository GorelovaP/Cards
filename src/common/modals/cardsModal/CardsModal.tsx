import React from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { addNewCardTC, updateCardInfoTC } from '../../../app/cards-reducer'
//import { Select } from '../../components/select/Select'
import { SelectStyled } from '../../components/select/SelectStyled'
import { MyInput } from '../../components/styledInput/MyInput'
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks'
import { StyledButton } from '../../styledComponents/styledButtons'
import { StyledErrorArea } from '../../styledComponents/styledErrorArea'
import BasicModal from '../basicModal/BasicModal'

import { StyledCardsModal } from './styledCardsModal'

type PropsType = {
  open: boolean
  onClose: () => void
  title: string
  initialQuestion: string
  initialAnswer: string
  cardId?: string
}

export const CardsModal = (props: PropsType) => {
  const isLoading = useAppSelector(state => state.app.isLoading)
  const chosenPack = useAppSelector(state => state.packs.chosenPack)

  const dispatch = useAppDispatch()

  const formik = useFormik({
    validationSchema: Yup.object({
      question: Yup.string().min(1).max(100).required('* field is required'),
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
        ? dispatch(addNewCardTC({ cardsPack_id: chosenPack, question: question, answer: answer }))
        : dispatch(updateCardInfoTC({ _id: props.cardId!, question: question, answer: answer }))
      props.onClose()
    },
  })

  return (
    <BasicModal open={props.open} onClose={props.onClose} title={props.title}>
      <StyledCardsModal>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              formik.handleSubmit()
            }
          }}
        >
          <div className={'inputErrorHandlerForm'}>
            {/*<Select options={questionFormat} label={'Choose a question format'} />*/}
            <SelectStyled />
            <MyInput
              text={'text'}
              label={'Question'}
              maxLength={100}
              placeholder={'Enter question'}
              {...formik.getFieldProps('question')}
            />
            <div className={'formErrorPlacement'}>
              {formik.errors.question && formik.touched.question ? (
                <StyledErrorArea>{formik.errors.question}</StyledErrorArea>
              ) : null}
              {formik.values.question.length > 100 ? (
                <StyledErrorArea>{'max length is 100 symbols'}</StyledErrorArea>
              ) : null}
            </div>
            <MyInput
              text={'text'}
              label={'Answer'}
              maxLength={100}
              placeholder={'Enter answer'}
              {...formik.getFieldProps('answer')}
            />
            <div className={'formErrorPlacement'}>
              {formik.errors.answer && formik.touched.answer ? (
                <StyledErrorArea>{formik.errors.answer}</StyledErrorArea>
              ) : null}
              {formik.values.answer.length > 100 ? (
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
      </StyledCardsModal>
    </BasicModal>
  )
}
