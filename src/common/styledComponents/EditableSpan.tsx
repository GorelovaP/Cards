import React, { ChangeEvent, memo, useState } from 'react'

import edit from '../../assets/images/edit.svg'

import { StyledInput } from './styledInput'

type EditableSpanPropsType = {
  title: string
  onChange: (newValue: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
  console.log('EditableSpan')
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activateVievMode = () => {
    setEditMode(false)
    props.onChange(title)
  }

  return editMode ? (
    <StyledInput
      text={title}
      autoFocus
      value={title}
      label={'save'}
      onBlur={activateVievMode}
      onChange={onChangeHandler}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>
      {props.title} <img src={edit} alt="edit" />
    </span>
  )
})
