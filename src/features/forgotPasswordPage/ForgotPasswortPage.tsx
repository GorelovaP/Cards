import React from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'

import { sendPasswordRecoveryTC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { StyleButtonFormAdjusted } from '../../common/styledComponents/styledButtons'
import { StyledErrorArea } from '../../common/styledComponents/styledErrorArea'
import {
  FormInfoText,
  H2,
  H4,
  StyledBottomFormLink,
} from '../../common/styledComponents/styledHeaders'
import { StyledInput } from '../../common/styledComponents/styledInput'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'
import { StyledSignUpForm } from '../signUpPage/SignUpPage'

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch()
  const sent = useAppSelector(store => store.app.passwordRecoveryEmailSent)
  const sentrecoveryLinkError = useAppSelector(store => store.app.passwordRecoveryError)

  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('* Email field is required'),
    }),
    initialValues: {
      email: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values))
      const from = `test-front-admin <ai73a@yandex.by>`
      const message = `<div style="background-color: lime; padding: 15px">
<b>password recovery link: </b>
<a href='http://localhost:3000/createnewpassword/$token$'>
Click here to set a new password</a>
</div>`

      dispatch(sendPasswordRecoveryTC(values.email, from, message))

      resetForm()
    },
  })

  if (sent) {
    return <Navigate to={'/checkemail'} />
  }

  return (
    <StyledSingFormWrapper>
      <StyledForgotPasswordPage>
        <H2>Forgot your password?</H2>
        <form onSubmit={formik.handleSubmit}>
          <div className={'inputErrorHandlerForm'}>
            <div className={'formErrorPlacement'}>
              {sentrecoveryLinkError && !formik.touched.email && (
                <StyledErrorArea>{sentrecoveryLinkError}</StyledErrorArea>
              )}
            </div>
            <StyledInput text={'email'} label={'Email'} {...formik.getFieldProps('email')} />
            <div className={'formErrorPlacement'}>
              {formik.errors.email && formik.touched.email ? (
                <StyledErrorArea>{formik.errors.email}</StyledErrorArea>
              ) : null}
            </div>
          </div>
          <FormInfoText>
            Enter your email address and we will send you further instructions
          </FormInfoText>
          <StyleButtonFormAdjusted type="submit">{'Send instructions'}</StyleButtonFormAdjusted>
        </form>
        <H4>Did you remember your password?</H4>
        <div className={'styledBottomFormLink'}>
          <StyledBottomFormLink>
            <NavLink to={'/signin'} className={'bottomFormLink'}>
              Try logging in
            </NavLink>
          </StyledBottomFormLink>
        </div>
      </StyledForgotPasswordPage>
    </StyledSingFormWrapper>
  )
}
// styled component
const StyledForgotPasswordPage = styled(StyledSignUpForm)`
  .inputErrorHandlerForm {
    position: relative;
    .formErrorPlacement {
      top: 70px;
      left: 0;
    }
  }
`