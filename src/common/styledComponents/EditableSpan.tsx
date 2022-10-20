import React, { useState } from 'react'

import { useFormik } from 'formik'
import styled from 'styled-components'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { changeUserNameTC } from '../../app/user-reducer'
import edit from '../../assets/images/edit.svg'

import { StyledInnerButton } from './styledButtons'
import { StyledErrorArea } from './styledErrorArea'
import { StyledInput } from './styledInput'

export const EditableSpan = () => {
  let name = useAppSelector(state => state.user.user.name)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().min(1).required('* Subject field is required'),
    }),
    initialValues: {
      name: name,
    },
    onSubmit: values => {
      dispatch(changeUserNameTC(values.name))
      setEditMode(false)
    },
  })

  let [editMode, setEditMode] = useState(false)

  const activateEditMode = () => {
    setEditMode(true)
  }

  const activateViewModeByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false)
      formik.submitForm()
    }
  }

  // function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
  //   setEditMode(false)
  //   formik.handleBlur
  //   formik.values.name = name
  // }

  return editMode ? (
    <FormSpan onSubmit={formik.handleSubmit}>
      <StyledInput
        text={'text'}
        className={'InputSpan'}
        autoFocus
        label={'Nickname'}
        onKeyPress={e => activateViewModeByEnter(e)}
        //onBlur={handleBlur}
        onBlur={formik.handleBlur}
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.errors.name && formik.touched.name ? (
        <StyledErrorArea>{formik.errors.name}</StyledErrorArea>
      ) : null}
      <StyledInnerButton type="submit">Save</StyledInnerButton>
    </FormSpan>
  ) : (
    <StyledSpan onDoubleClick={activateEditMode}>
      {name} <img src={edit} alt="edit" />
    </StyledSpan>
  )
}

export const StyledSpan = styled.span`
  text-align: center;
  position: center;
  margin-bottom: 14px;
`
export const FormSpan = styled.form`
  width: 100%;
  position: relative;
  height: 67px;

  .InputSpan {
    margin-bottom: 0;
  }
`
