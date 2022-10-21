import React, { memo, useState } from 'react'

import { useFormik } from 'formik'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Navigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'

import { createNewPasswordTC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { StyledInput } from '../../common/components/styledInput'
import { StyledButton } from '../../common/styledComponents/styledButtons'
import { StyledErrorArea } from '../../common/styledComponents/styledErrorArea'
import { H2, H4 } from '../../common/styledComponents/styledHeaders'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'

export const CreateNewPassword = memo(() => {
  const [passwordIcon, setPasswordIcon] = useState(true)
  const [passwordShowMode, setPasswordShowMode] = useState(true)

  const commonError = useAppSelector(store => store.app.commonError)
  const newPasswordCreated = useAppSelector(store => store.app.newPasswordCreated)

  // getting url address
  const { token } = useParams()

  console.log(window.location.pathname)

  const onClickAction = () => {
    setPasswordIcon(!passwordIcon)
    setPasswordShowMode(!passwordShowMode)
  }

  const dispatch = useAppDispatch()

  const formik = useFormik({
    validationSchema: Yup.object({
      password: Yup.string().required('* Subject field is required'),
    }),
    initialValues: {
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values))
      if (token) {
        dispatch(createNewPasswordTC(values.password, token))
        resetForm()
      }
    },
  })

  if (newPasswordCreated) {
    return <Navigate to={'/signin'} />
  }

  return (
    <StyledSingFormWrapper>
      <StyledCreateNewPassword>
        <H2>Create new password</H2>
        <form onSubmit={formik.handleSubmit}>
          <div className={'inputErrorHandlerForm'}>
            <div className={'formErrorPlacement'}>
              {commonError && !formik.touched.password && (
                <StyledErrorArea>{commonError}</StyledErrorArea>
              )}
            </div>
            <StyledInput
              text={passwordShowMode ? 'password' : 'text'}
              placeholder={'Password'}
              icon={passwordIcon ? AiFillEye : AiFillEyeInvisible}
              onClickAction={onClickAction}
              {...formik.getFieldProps('password')}
            />
            <div className={'formErrorPlacement'}>
              {formik.errors.password && formik.touched.password ? (
                <StyledErrorArea>{formik.errors.password}</StyledErrorArea>
              ) : null}
            </div>
          </div>
          <H4>Create new password and we will send you further instructions to email</H4>
          <StyledButton className={'CreateNewPasswordBtn'} type="submit">
            Create new password
          </StyledButton>
        </form>
      </StyledCreateNewPassword>
    </StyledSingFormWrapper>
  )
})

// styled component
const StyledCreateNewPassword = styled.div`
  .CreateNewPasswordBtn {
    margin: 42px 0 15px;
  }

  H2 {
    margin-bottom: 67px;
  }

  H4 {
    font-weight: 400;
    text-align: left;
  }
`
