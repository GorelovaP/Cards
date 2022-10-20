import React, { ChangeEvent, memo, useState } from 'react'

import styled from 'styled-components'

import edit from '../../assets/images/edit.svg'

import { StyledInput } from './styledInput'

type EditableSpanPropsType = {
  title: string
  onChange: (newValue: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const activateViewModeByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false)
      props.onChange(title)
    }
  }

  return editMode ? (
    <StyledInput
      text={title}
      autoFocus
      value={title}
      label={'Nickname'}
      onKeyPress={e => activateViewModeByEnter(e)}
      onBlur={activateViewMode}
      onChange={onChangeHandler}
    />
  ) : (
    <StyledSpan onDoubleClick={activateEditMode}>
      {props.title} <img src={edit} alt="edit" />
    </StyledSpan>
  )
})
export const StyledSpan = styled.span`
  text-align: center;
  position: center;
  margin-bottom: 14px;
`
