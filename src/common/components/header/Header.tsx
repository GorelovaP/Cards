import React, { useState } from 'react'

import ClickAwayListener from '@mui/material/ClickAwayListener'
import { useNavigate, useMatch } from 'react-router-dom'

import { singOutTC } from '../../../app/app-reducer'
import { PATH } from '../../../app/routes/PagesRoutes'
import logo from '../../../assets/images/header/logo.svg'
import avatar from '../../../assets/images/initialization/avatar.png'
import logout from '../../../assets/images/menu/logout.svg'
import user from '../../../assets/images/menu/user.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks'
import { StyleButtonForHeader } from '../../styledComponents/styledButtons'
import { LoadingProcess } from '../loadingProgress/LoadingProcess'
import { MenuItem } from '../menuItem/MenuItem'
import { StyledMenuItemContainer } from '../menuItem/styledMenuItem'

import { StyleHeader, StyleHeaderRightIcons, StyleHeaderSecond } from './styledHeader'

export const Header = () => {
  const dispatch = useAppDispatch()
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const match = useMatch('/:routeKey/*')
  const userName = useAppSelector(state => state.user.user.name)

  const isLoading = useAppSelector(store => store.app.isLoading)

  const handleClickAway = () => {
    setShow(false)
  }

  const logOut = () => {
    dispatch(singOutTC())
  }
  const popUpHandler = () => {
    setShow(!show)
  }

  const gotoSingIn = () => {
    setShow(false)
    navigate(PATH.LOGIN)
  }
  const gotoProfile = () => {
    setShow(false)
    navigate(PATH.PROFILE)
  }

  return (
    <StyleHeader>
      <StyleHeaderSecond>
        <img src={logo} alt="logo" />
        <div>
          {'/' + match?.params.routeKey === PATH.REGISTRATION ||
          '/' + match?.params.routeKey === PATH.CREATE_NEW_PASSWORD ||
          '/' + match?.params.routeKey === PATH.LOGIN ||
          '/' + match?.params.routeKey === PATH.CHECK_EMAIL ||
          '/' + match?.params.routeKey === PATH.FORGOT_PASSWORD ? (
            <StyleButtonForHeader onClick={gotoSingIn}> Sign in</StyleButtonForHeader>
          ) : (
            <StyleHeaderRightIcons>
              <div className={'personalName'}> {userName} </div>
              <img
                className={'personalIcon'}
                alt={'personalIcon'}
                src={avatar}
                onClick={popUpHandler}
              />
              {show && (
                <ClickAwayListener onClickAway={handleClickAway}>
                  <StyledMenuItemContainer>
                    <MenuItem text={'Profile'} icon={user} onClickHandler={gotoProfile} />
                    <MenuItem text={'Log out'} icon={logout} onClickHandler={logOut} />
                  </StyledMenuItemContainer>
                </ClickAwayListener>
              )}
            </StyleHeaderRightIcons>
          )}
        </div>
      </StyleHeaderSecond>
      {isLoading && <LoadingProcess />}
    </StyleHeader>
  )
}
