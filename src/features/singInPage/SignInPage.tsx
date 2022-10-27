import React, { useEffect, useState } from 'react'

import { useFormik } from 'formik'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { newPasswordCreatedAC, setAppErrorAC, signUpAC, singInTC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { MyCheckBox } from '../../common/components/styledChackBox/MyCheckBox'
import { MyInput } from '../../common/components/styledInput/MyInput'
import { StyleButtonFormAdjusted } from '../../common/styledComponents/styledButtons'
import { StyledErrorArea } from '../../common/styledComponents/styledErrorArea'
import { H2, H4, StyledBottomFormLink } from '../../common/styledComponents/styledHeaders'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'
import { PATH } from '../routes/PagesRoutes'

import { StyledSignInForm } from './styledSignIn'

export const SignInPage = () => {
  const [passwordIcon, setPasswordIcon] = useState(true)
  const [passwordShowMode, setPasswordShowMode] = useState(true)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

  const clearError = () => {
    dispatch(setAppErrorAC(''))
  }

  useEffect(() => {
    dispatch(signUpAC(false))
    dispatch(newPasswordCreatedAC(false))
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setAppErrorAC(''))
      navigate(PATH.PROFILE)
    }
  }, [isLoggedIn])

  const onClickAction = () => {
    setPasswordIcon(!passwordIcon)
    setPasswordShowMode(!passwordShowMode)
  }

  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('* Email field is required'),
      password: Yup.string().min(8).required('* Subject field is required'),
    }),
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    onSubmit: values => {
      dispatch(singInTC(values))
    },
  })

  return (
    <StyledSingFormWrapper>
      <StyledSignInForm>
        <H2>Sing In</H2>
        <form onSubmit={formik.handleSubmit}>
          <MyInput text={'email'} label={'Email'} {...formik.getFieldProps('email')} />
          {formik.errors.email && formik.touched.email ? (
            <StyledErrorArea>{formik.errors.email}</StyledErrorArea>
          ) : null}
          <MyInput
            text={passwordShowMode ? 'password' : 'text'}
            label={'Password'}
            icon={passwordIcon ? AiFillEye : AiFillEyeInvisible}
            onClickAction={onClickAction}
            {...formik.getFieldProps('password')}
          />
          {formik.errors.password && formik.touched.password ? (
            <StyledErrorArea>{formik.errors.password}</StyledErrorArea>
          ) : null}
          <MyCheckBox
            labelValue="Remember me"
            {...formik.getFieldProps('rememberMe')}
            checked={formik.values.rememberMe}
          />

          <NavLink to={PATH.FORGOT_PASSWORD} className={'navLink'}>
            Forgot password?
          </NavLink>
          <div className={'formButton'}>
            <StyleButtonFormAdjusted type="submit"> Sing In </StyleButtonFormAdjusted>
          </div>
        </form>
        <H4>Already have an account?</H4>
        <div className={'styledBottomFormLink'}>
          <StyledBottomFormLink>
            <NavLink to={PATH.REGISTRATION} className={'bottomFormLink'} onClick={clearError}>
              Sign Up
            </NavLink>
          </StyledBottomFormLink>
        </div>
      </StyledSignInForm>
    </StyledSingFormWrapper>
  )
}
