import React, { useState } from 'react'

import { useFormik } from 'formik'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import styled from 'styled-components'
import * as Yup from 'yup'

import { signUpTC } from '../../app/app-reducer'
import { useAppDispatch } from '../../app/hooks'
import { StyledButton } from '../../common/styledComponents/styledButtons'
import { StyledErrorArea } from '../../common/styledComponents/styledErrorArea'
import { H2, H4 } from '../../common/styledComponents/styledHeaders'
import { StyledInput } from '../../common/styledComponents/styledInput'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'

export const CreateNewPassword = () => {
  const [passwordIcon, setPasswordIcon] = useState(true)
  const [passwordShowMode, setPasswordShowMode] = useState(true)

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
      dispatch(signUpTC(values.password, values.password))
      resetForm()
    },
  })

  return (
    <StyledSingFormWrapper>
      <StyledCreateNewPassword>
        <H2>Create new password</H2>
        <form action="">
          <div className={'inputErrorHandlerForm'}>
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
          <StyledButton className={'CreateNewPasswordBtn'}>Create new password</StyledButton>
        </form>
      </StyledCreateNewPassword>
    </StyledSingFormWrapper>
  )
}

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