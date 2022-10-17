import React from 'react'

import styled from 'styled-components'

import logo from '../../assets/images/logo.svg'

import { StyledPrimaryFormButton } from './styledButtons'

export const Header = () => {
  return (
    <StyledSignUpForm>
      <img src={logo} alt="logo" />
      <div>
        <StyledPrimaryFormButton text={'sign in'} />
      </div>
    </StyledSignUpForm>
  )
}

export const StyledSignUpForm = styled.div`
  //position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 136px;
  background-color: #fcfcfc;
  box-shadow: 0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3);

  div {
    width: 113px;
  }
`
