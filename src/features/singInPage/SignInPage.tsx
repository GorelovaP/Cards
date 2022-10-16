import React, { useState } from 'react'

import { useFormik } from 'formik'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import styled from 'styled-components'

import { StyledPrimaryFormButton } from '../../common/styledComponents/styledButtons'
import { StyledCheckbox } from '../../common/styledComponents/styledCheckbox'
import { H2, H4, StyledBottomFormLink } from '../../common/styledComponents/styledHeaders'
import { StyledInput } from '../../common/styledComponents/styledInput'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'

export const SignInPage = () => {
  const [passwordIcon, setPasswordIcon] = useState(true)
  const [passwordShowMode, setPasswordShowMode] = useState(true)

  const onClickAction = () => {
    setPasswordIcon(!passwordIcon)
    setPasswordShowMode(!passwordShowMode)
  }

  const formik = useFormik({
    validate: values => {
      if (!values.email) {
        return {
          email: 'Email is required',
        }
      }
      if (!values.password) {
        return {
          password: 'Password is required',
        }
      }
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    onSubmit: values => {
      console.log(JSON.stringify(values))
      //dispatch();
    },
  })

  return (
    <StyledSingFormWrapper>
      <StyledSignUpForm>
        <H2>Sing In</H2>
        <form onSubmit={formik.handleSubmit}>
          <StyledInput text={'email'} label={'Email'} />
          <StyledInput
            text={passwordShowMode ? 'password' : 'text'}
            label={'Password'}
            icon={passwordIcon ? AiFillEye : AiFillEyeInvisible}
            onClickAction={onClickAction}
          />
          <StyledCheckbox
            labelValue="Remember me"
            {...formik.getFieldProps('rememberMe')}
            checked={formik.values.rememberMe}
          />
          <a href="#" className={'navLink'}>
            Forgot password?
          </a>
          <div className={'formButton'}>
            <StyledPrimaryFormButton text={'Sign In'} />
          </div>
        </form>
        <H4>Already have an account?</H4>
        <div className={'styledBottomFormLink'}>
          <StyledBottomFormLink href="">Sign Up</StyledBottomFormLink>
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
    margin: 69px 0 31px;
  }

  .styledBottomFormLink {
    text-align: center;
  }
`
