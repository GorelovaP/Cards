import React from 'react'

import { useNavigate, useMatch } from 'react-router-dom'
import styled from 'styled-components'

import avatar from '../../assets/images/avatar.svg'
import logo from '../../assets/images/logo.svg'

import { StyleButtonForHeader } from './styledButtons'
import { StyledMainWrapper } from './styledWrappers'

export const Header = () => {
  const navigate = useNavigate()
  const match = useMatch('/:routeKey')

  const GotoSingIn = () => {
    navigate('/signin')
  }
  const GotoProfile = () => {
    navigate('/profile')
  }

  return (
    <StyleHeader>
      <StyleHeaderSecond>
        <img src={logo} alt="logo" />
        <div>
          {match?.params.routeKey === 'signup' ||
          match?.params.routeKey === 'signin' ||
          match?.params.routeKey === 'checkemail' ||
          match?.params.routeKey === 'forgotpassword' ? (
            <StyleButtonForHeader onClick={GotoSingIn}> Sign in</StyleButtonForHeader>
          ) : (
            <StyleHeaderRightIcons onClick={GotoProfile}>
              <div className={'personalName'}> Login </div>
              <img className={'personalIcon'} alt={'personalIcon'} src={avatar} />
            </StyleHeaderRightIcons>
          )}
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
  box-shadow: 0 2px 10px rgba(109, 109, 109, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3);
`
export const StyleHeaderSecond = styled(StyledMainWrapper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
`
export const StyleHeaderRightIcons = styled.div`
  display: flex;
  align-items: center;
  .personalName {
    border-bottom: 1px dotted #000;
    text-decoration: none;
  }
  .personalIcon {
    margin-left: 12px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`
