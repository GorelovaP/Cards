import React, { useState } from 'react'

import { SelectStyled } from '../../components/select/SelectStyled'
import BasicModal from '../basicModal/BasicModal'

import { ImgForm } from './imgForm/ImgForm'
import { StyledCardsModal } from './styledCardsModal'
import { TextForm } from './textForm/TextForm'

type PropsType = {
  open: boolean
  onClose: () => void
  title: string
  initialQuestion?: string
  initialAnswer?: string
  initialQuestionImg?: string
  initialAnswerImg?: string
  cardId?: string
}

export const CardsModal = (props: PropsType) => {
  const initialSelectValue =
    props.initialAnswerImg && props.initialAnswerImg !== ' ' ? 'Image' : 'Text'

  const [selectValue, setSelectValue] = useState(initialSelectValue)

  const changeSelectValue = (value: string) => {
    setSelectValue(value)
  }

  return (
    <BasicModal open={props.open} onClose={props.onClose} title={props.title}>
      <StyledCardsModal>
        <SelectStyled callback={changeSelectValue} initialValue={initialSelectValue} />
        {selectValue === 'Text' ? (
          <TextForm
            onClose={props.onClose}
            initialQuestion={props.initialQuestion}
            initialAnswer={props.initialAnswer}
            cardId={props.cardId}
          />
        ) : (
          <ImgForm
            onClose={props.onClose}
            cardId={props.cardId}
            initialQuestionImg={props.initialQuestionImg}
            initialAnswerImg={props.initialAnswerImg}
          />
        )}
      </StyledCardsModal>
    </BasicModal>
  )
}
