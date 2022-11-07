import React, { memo, useState } from 'react'

import { useFormik } from 'formik'
import { BiEditAlt } from 'react-icons/bi'
import styled from 'styled-components'
import * as Yup from 'yup'

import { changeUserNameOrImageTC } from '../../../../app/user-reducer'
import { MyInput } from '../../../../common/components/styledInput/MyInput'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/appHooks'
import { StyledInnerButton } from '../../../../common/styledComponents/styledButtons'
import { StyledErrorArea } from '../../../../common/styledComponents/styledErrorArea'

export const EditableSpan = memo(() => {
  const name = useAppSelector(state => state.user.user.name)
  const avatar = useAppSelector(state => state.user.user.avatar)

  const dispatch = useAppDispatch()

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().min(1).required('* Subject field is required'),
    }),
    initialValues: {
      name: name,
    },
    onSubmit: values => {
      dispatch(changeUserNameOrImageTC(values.name, avatar!))
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
      {name} <BiEditAlt onClick={activateEditMode} className={'spanIcon'} />
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
  cursor: pointer;

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
