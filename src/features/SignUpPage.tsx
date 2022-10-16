import React, { useState } from 'react'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import styled from 'styled-components'

import { StyleButtonFormAdjusted } from '../common/styledComponents/styledButtons'
import { H2, H4, StyledBottomFormLink } from '../common/styledComponents/styledHeaders'
import { StyledInput } from '../common/styledComponents/styledInput'
import { StyledSingFormWrapper } from '../common/styledComponents/styledWrappers'

export const SignUpPage = () => {
  const [passwordIcon, setPasswordIcon] = useState(true)
  const [passwordShowMode, setPasswordShowMode] = useState(true)

  const onClickAction = () => {
    setPasswordIcon(!passwordIcon)
    setPasswordShowMode(!passwordShowMode)
  }

  return (
    <StyledSingFormWrapper>
      <StyledSignUpForm>
        <H2>Sing Up</H2>
        <form action="">
          <StyledInput text={'email'} label={'Email'} />
          <StyledInput
            text={passwordShowMode ? 'password' : 'text'}
            label={'Password'}
            icon={passwordIcon ? AiFillEye : AiFillEyeInvisible}
            onClickAction={onClickAction}
          />
          <StyledInput
            text={passwordShowMode ? 'password' : 'text'}
            label={'Confirm Password'}
            icon={passwordIcon ? AiFillEye : AiFillEyeInvisible}
            onClickAction={onClickAction}
          />
          <StyleButtonFormAdjusted>{'Sign Up'}</StyleButtonFormAdjusted>
        </form>
        <H4>Already have an account</H4>
        <div className={'styledBottomFormLink'}>
          <StyledBottomFormLink href="">Sign In</StyledBottomFormLink>
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
`
