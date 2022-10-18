import React from 'react'

import styled from 'styled-components'

import logo from '../../assets/images/logo.svg'

import { StyledPrimaryFormButton } from './styledButtons'
import { StyledMainWrapper } from './styledWrappers'

export const Header = () => {
  return (
    <StyleHeader>
      <StyleHeaderSecond>
        <img src={logo} alt="logo" />
        <div>
          <StyledPrimaryFormButton text={'sign in'} />
        </div>
      </StyleHeaderSecond>
    </StyleHeader>
  )
}

export const StyleHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fcfcfc;
  box-shadow: 0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3);
`
export const StyleHeaderSecond = styled(StyledMainWrapper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  div {
    width: 113px;
  }
`
