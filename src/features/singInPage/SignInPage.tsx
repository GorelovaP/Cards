import React, { useEffect, useState } from 'react'

import { useFormik } from 'formik'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'

import { signUpAC } from '../../app/app-reducer'
import { useAppDispatch } from '../../app/hooks'
import { StyleButtonFormAdjusted } from '../../common/styledComponents/styledButtons'
import { StyledCheckbox } from '../../common/styledComponents/styledCheckbox'
import { StyledErrorArea } from '../../common/styledComponents/styledErrorArea'
import { H2, H4, StyledBottomFormLink } from '../../common/styledComponents/styledHeaders'
import { StyledInput } from '../../common/styledComponents/styledInput'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'

export const SignInPage = () => {
  const [passwordIcon, setPasswordIcon] = useState(true)
  const [passwordShowMode, setPasswordShowMode] = useState(true)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(signUpAC(false))
  }, [])

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
    onSubmit: (values: any) => {
      console.log(JSON.stringify(values))
      //dispatch();
    },
  })

  return (
    <StyledSingFormWrapper>
      <StyledSignUpForm>
        <H2>Sing In</H2>
        <form onSubmit={formik.handleSubmit}>
          <StyledInput text={'email'} label={'Email'} {...formik.getFieldProps('email')} />
          {formik.errors.email && formik.touched.email ? (
            <StyledErrorArea>{formik.errors.email}</StyledErrorArea>
          ) : null}
          <StyledInput
            text={passwordShowMode ? 'password' : 'text'}
            label={'Password'}
            icon={passwordIcon ? AiFillEye : AiFillEyeInvisible}
            onClickAction={onClickAction}
            {...formik.getFieldProps('password')}
          />
          {formik.errors.password && formik.touched.password ? (
            <StyledErrorArea>{formik.errors.password}</StyledErrorArea>
          ) : null}
          <StyledCheckbox
            labelValue="Remember me"
            {...formik.getFieldProps('rememberMe')}
            checked={formik.values.rememberMe}
          />

          <NavLink to={'/forgotpassword'} className={'navLink'}>
            Forgot password?
          </NavLink>
          <div className={'formButton'}>
            <StyleButtonFormAdjusted type="submit"> Sing In </StyleButtonFormAdjusted>
          </div>
        </form>
        <H4>Already have an account?</H4>
        <div className={'styledBottomFormLink'}>
          <StyledBottomFormLink>
            <NavLink to={'/signup'} className={'bottomFormLink'}>
              Sign Up
            </NavLink>
          </StyledBottomFormLink>
        </div>
      </StyledSignUpForm>
    </StyledSingFormWrapper>
  )
}

// styled component
const StyledSignUpForm = styled.div`
  H2 {
    margin-bottom: 41px;
  }

  H4 {
    margin-bottom: 11px;
  }

  .navLink {
    color: #000000;
    display: block;
    text-align: end;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }

  .formButton {
    margin: 9px 0 31px;
  }

  .styledBottomFormLink {
    text-align: center;
    margin-bottom: 11px;
  }
`
