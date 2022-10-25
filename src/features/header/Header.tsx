import React, { useEffect, useRef, useState } from 'react'

import { useNavigate, useMatch } from 'react-router-dom'

import { singOutTC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import avatar from '../../assets/images/avatar.png'
import logo from '../../assets/images/logo.svg'
import { LoadingProcess } from '../../common/components/loadingProgress/LoadingProcess'
import { MenuItem } from '../../common/components/menuItem/MenuItem'
import { StyledMenuItemContainer } from '../../common/components/menuItem/styledMenuItem'
import { StyleButtonForHeader } from '../../common/styledComponents/styledButtons'
import { PATH } from '../routes/PagesRoutes'

import logout from './../../assets/images/menu/logout.svg'
import user from './../../assets/images/menu/user.svg'
import { StyleHeader, StyleHeaderRightIcons, StyleHeaderSecond } from './styledHeader'

export const Header = () => {
  const dispatch = useAppDispatch()
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const match = useMatch('/:routeKey/*')
  const userName = useAppSelector(state => state.user.user.name)

  const isLoading = useAppSelector(store => store.app.isLoading)

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShow(false)
      }
    }

    document.addEventListener('click', closeDropdown)

    return () => {
      document.removeEventListener('click', closeDropdown)
    }
  }, [menuRef])

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
            <StyleHeaderRightIcons ref={menuRef}>
              <div className={'personalName'}> {userName} </div>
              <img
                className={'personalIcon'}
                alt={'personalIcon'}
                src={avatar}
                onClick={popUpHandler}
              />
              {show && (
                <StyledMenuItemContainer>
                  <MenuItem text={'Profile'} icon={user} onClickHandler={gotoProfile} />
                  <MenuItem text={'Log out'} icon={logout} onClickHandler={logOut} />
                </StyledMenuItemContainer>
              )}
            </StyleHeaderRightIcons>
          )}
        </div>
      </StyleHeaderSecond>
      {isLoading && <LoadingProcess />}
    </StyleHeader>
  )
}
