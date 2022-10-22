import React, { useEffect } from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import { passwordRecoveryEmailSentAC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import emailIcon from '../../assets/images/Email.svg'
import { StyledButton } from '../../common/styledComponents/styledButtons'
import { H2, H4 } from '../../common/styledComponents/styledHeaders'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'
import { PATH } from '../routes/PagesRoutes'

import { StyledSignUpForm } from './styledCheckEmail'

export const CheckEmail = () => {
  const dispatch = useAppDispatch()
  const email = useAppSelector(state => state.app.passwordRecoveryEmail)

  useEffect(() => {
    dispatch(passwordRecoveryEmailSentAC(false))
  }, [])

  let navigate = useNavigate()
  const goLogin = () => {
    navigate(PATH.LOGIN)
  }

  if (!email) {
    return <Navigate to={PATH.FORGOT_PASSWORD} />
  }

  return (
    <StyledSingFormWrapper>
      <StyledSignUpForm>
        <H2>Check Email</H2>
        <div className={'imageContainer'}>
          <img src={emailIcon} alt="EmailIcon" className={'icon'} />
        </div>
        <H4>We’ve sent an Email with instructions to {email}</H4>
        <StyledButton className={'checkEmailBtn'} onClick={goLogin}>
          Back to login
        </StyledButton>
      </StyledSignUpForm>
    </StyledSingFormWrapper>
  )
}
