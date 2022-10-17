import React from 'react'

import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'

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
  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('* Email field is required'),
    }),
    initialValues: {
      email: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values))
      //dispatch();
      resetForm()
    },
  })

  return (
    <StyledSingFormWrapper>
      <StyledForgotPasswordPage>
        <H2>Forgot your password?</H2>
        <form onSubmit={formik.handleSubmit}>
          <div className={'inputErrorHandlerForm'}>
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
      position: absolute;
      top: 70px;
      left: 0;
    }
  }
`
