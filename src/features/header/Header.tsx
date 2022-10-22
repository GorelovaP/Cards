import React from 'react'

import { useNavigate, useMatch } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import avatar from '../../assets/images/avatar.png'
import logo from '../../assets/images/logo.svg'
import { LoadingProcess } from '../../common/components/loadingProgress/LoadingProcess'
import { StyleButtonForHeader } from '../../common/styledComponents/styledButtons'

import { StyleHeader, StyleHeaderRightIcons, StyleHeaderSecond } from './styledHeader'

export const Header = () => {
  const navigate = useNavigate()
  const match = useMatch('/:routeKey/*')
  const userName = useAppSelector(state => state.user.user.name)

  const isLoading = useAppSelector(store => store.app.isLoading)

  const gotoSingIn = () => {
    navigate('/signin')
  }
  const gotoProfile = () => {
    navigate('/profile')
  }

  return (
    <StyleHeader>
      <StyleHeaderSecond>
        <img src={logo} alt="logo" />
        <div>
          {match?.params.routeKey === 'signup' ||
          match?.params.routeKey === 'createnewpassword' ||
          match?.params.routeKey === 'signin' ||
          match?.params.routeKey === 'checkemail' ||
          match?.params.routeKey === 'forgotpassword' ? (
            <StyleButtonForHeader onClick={gotoSingIn}> Sign in</StyleButtonForHeader>
          ) : (
            <StyleHeaderRightIcons onClick={gotoProfile}>
              <div className={'personalName'}> {userName} </div>
              <img className={'personalIcon'} alt={'personalIcon'} src={avatar} />
            </StyleHeaderRightIcons>
          )}
        </div>
      </StyleHeaderSecond>
      {isLoading && <LoadingProcess />}
    </StyleHeader>
  )
}
