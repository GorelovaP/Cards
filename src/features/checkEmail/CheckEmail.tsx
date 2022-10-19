import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { passwordRecoveryEmailSentAC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import emailIcon from '../../assets/images/Email.svg'
import { StyledButton } from '../../common/styledComponents/styledButtons'
import { H2, H4 } from '../../common/styledComponents/styledHeaders'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'
import { theme } from '../../common/styledComponents/theme'

export const CheckEmail = () => {
  const dispatch = useAppDispatch()
  const email = useAppSelector(state => state.app.passwordRecoveryEmailSent)

  useEffect(() => {
    dispatch(passwordRecoveryEmailSentAC(false))
  }, [])

  let navigate = useNavigate()
  const goLogin = () => {
    navigate('/signin')
  }

  if (email) {
    navigate('/forgotpassword')
  }

  return (
    <StyledSingFormWrapper>
      <StyledSignUpForm>
        <H2>Check Email</H2>
        <div className={'imageContainer'}>
          <img src={emailIcon} alt="EmailIcon" className={'icon'} />
        </div>
        {/*не забыть сделать емаил нестатичным*/}
        <H4>We’ve sent an Email with instructions to {email}</H4>
        <StyledButton className={'checkEmailBtn'} onClick={goLogin}>
          Back to login
        </StyledButton>
      </StyledSignUpForm>
    </StyledSingFormWrapper>
  )
}

const StyledSignUpForm = styled.div`
  H2 {
    margin-bottom: 29px;
  }

  .imageContainer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    height: 108px;
    width: 108px;
    border-radius: 50%;
    border: 1px solid ${theme.colors.buttonPrimaryBg};
    background-color: rgba(${theme.colors.buttonPrimaryBgRGB}, 0.05);
  }

  .icon {
    margin-left: 4px;
  }

  H4 {
    font-weight: 400;
    margin: 31px 0 41px 0;
  }
  .checkEmailBtn {
    margin-bottom: 15px;
  }
`
