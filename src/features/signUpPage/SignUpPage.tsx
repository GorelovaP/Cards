import React, { useState } from 'react'

import { useFormik } from 'formik'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { NavLink, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'

// @ts-ignore
import { signUpTC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { StyleButtonFormAdjusted } from '../../common/styledComponents/styledButtons'
import { StyledErrorArea } from '../../common/styledComponents/styledErrorArea'
import { H2, H4, StyledBottomFormLink } from '../../common/styledComponents/styledHeaders'
import { StyledInput } from '../../common/styledComponents/styledInput'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'

export const SignUpPage = () => {
  const [passwordIcon, setPasswordIcon] = useState(true)
  const [passwordShowMode, setPasswordShowMode] = useState(true)

  const onClickAction = () => {
    setPasswordIcon(!passwordIcon)
    setPasswordShowMode(!passwordShowMode)
  }

  const signUpStatus = useAppSelector(store => store.app.registered)
  const signUpRegError = useAppSelector(store => store.app.regError)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('* Email field is required'),
      password: Yup.string().min(8).required('* Subject field is required'),
      confirmPassword: Yup.string()
        .min(8)
        .required('* Subject field is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(signUpTC(values.email, values.password))
      resetForm()
    },
  })

  if (signUpStatus) {
    return <Navigate to={'/signin'} />
  }

  return (
    <StyledSingFormWrapper>
      <StyledSignUpForm>
        <H2>Sing Up</H2>
        <form onSubmit={formik.handleSubmit}>
          <div className={'inputErrorHandlerForm'}>
            <div className={'formErrorPlacement'}>
              {signUpRegError && !formik.touched.email && (
                <StyledErrorArea>{signUpRegError}</StyledErrorArea>
              )}
            </div>
            <StyledInput text={'email'} label={'Email'} {...formik.getFieldProps('email')} />
            <div className={'formErrorPlacement'}>
              {formik.errors.email && formik.touched.email ? (
                <StyledErrorArea>{formik.errors.email}</StyledErrorArea>
              ) : null}
            </div>
          </div>
          <div className={'inputErrorHandlerForm'}>
            <StyledInput
              text={passwordShowMode ? 'password' : 'text'}
              label={'Password'}
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
          <div className={'inputErrorHandlerForm'}>
            <StyledInput
              text={passwordShowMode ? 'password' : 'text'}
              label={'Confirm Password'}
              icon={passwordIcon ? AiFillEye : AiFillEyeInvisible}
              onClickAction={onClickAction}
              {...formik.getFieldProps('confirmPassword')}
            />
            <div className={'formErrorPlacement'}>
              {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                <StyledErrorArea>{formik.errors.confirmPassword}</StyledErrorArea>
              ) : null}
            </div>
          </div>
          <StyleButtonFormAdjusted type="submit">{'Sign Up'}</StyleButtonFormAdjusted>
        </form>
        <H4>Already have an account</H4>
        <div className={'styledBottomFormLink'}>
          <StyledBottomFormLink>
            <NavLink to={'/signin'} className={'bottomFormLink'}>
              Sign In
            </NavLink>
          </StyledBottomFormLink>
        </div>
      </StyledSignUpForm>
    </StyledSingFormWrapper>
  )
}

// styled component
export const StyledSignUpForm = styled.div`
  H2 {
    margin-bottom: 41px;
  }

  H4 {
    margin-bottom: 11px;
  }

  .styledBottomFormLink {
    text-align: center;
  }

  .inputErrorHandlerForm {
    position: relative;

    .formErrorPlacement {
      top: 70px;
      left: 0;
    }
  }
`