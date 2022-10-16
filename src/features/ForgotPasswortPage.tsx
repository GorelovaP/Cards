import React from 'react'

import styled from 'styled-components'

import { StyledPrimaryFormButton } from '../common/styledComponents/styledButtons'
import {
  FormInfoText,
  H2,
  H4,
  StyledBottomFormLink,
} from '../common/styledComponents/styledHeaders'
import { StyledInput } from '../common/styledComponents/styledInput'
import { StyledSingFormWrapper } from '../common/styledComponents/styledWrappers'

import { StyledSignUpForm } from './SignUpPage'

export const ForgotPasswordPage = () => {
  return (
    <StyledSingFormWrapper>
      <StyledForgotPasswordPage>
        <H2>Forgot your password?</H2>
        <form action="">
          <StyledInput text={'email'} label={'Email'} />
          <FormInfoText>
            Enter your email address and we will send you further instructions
          </FormInfoText>
          <div className={'formButton'}>
            <StyledPrimaryFormButton text={'Send indtructions'} />
          </div>
        </form>
        <H4>Did you remember your password?</H4>
        <div className={'styledBottomFormLink'}>
          <StyledBottomFormLink href="">Try logging in</StyledBottomFormLink>
        </div>
      </StyledForgotPasswordPage>
    </StyledSingFormWrapper>
  )
}

// styled component
const StyledForgotPasswordPage = styled(StyledSignUpForm)``
