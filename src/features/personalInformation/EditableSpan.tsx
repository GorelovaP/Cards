import React, { memo, useState } from 'react'

import { useFormik } from 'formik'
import { BiEditAlt } from 'react-icons/bi'
import styled from 'styled-components'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { changeUserNameTC } from '../../app/user-reducer'
import { MyInput } from '../../common/components/styledInput/MyInput'
import { StyledInnerButton } from '../../common/styledComponents/styledButtons'
import { StyledErrorArea } from '../../common/styledComponents/styledErrorArea'

export const EditableSpan = memo(() => {
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
      <MyInput
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
      {name} <BiEditAlt className={'spanIcon'} />
    </StyledSpan>
  )
})

//styled components
export const StyledSpan = styled.span`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  .spanIcon {
    margin-left: 10px;
    height: 20px;
    width: 20px;
  }
`
export const FormSpan = styled.form`
  width: 100%;
  position: relative;
  height: 67px;

  .InputSpan {
    margin-bottom: 0;
  }
`
