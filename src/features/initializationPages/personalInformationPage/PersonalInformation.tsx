import React from 'react'

import { IoMdLogOut } from 'react-icons/io'
import { Navigate } from 'react-router-dom'

import { singOutTC } from '../../../app/app-reducer'
import { PATH } from '../../../app/routes/PagesRoutes'
import avatar from '../../../assets/images/avatar.png'
import photo from '../../../assets/images/photo.png'
import { BackToPack } from '../../../common/components/backToPack/BackToPack'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/appHooks'
import { LogOutButton } from '../../../common/styledComponents/styledButtons'
import { H2, H4 } from '../../../common/styledComponents/styledHeaders'

import { EditableSpan } from './EditableSpan'
import { StyledPersonalFormWrapper, StyledPersonalInformation } from './styledPersonalInformation'

export const PersonalInformation = () => {
  const dispatch = useAppDispatch()

  let isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  let email = useAppSelector(state => state.user.user.email)

  const logOut = () => {
    dispatch(singOutTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <>
      <BackToPack />
      <StyledPersonalFormWrapper>
        <StyledPersonalInformation>
          <H2>Personal Information</H2>
          <div className={'photo'}>
            <img className={'avatar'} src={avatar} alt="avatar" />
            <button className={'buttonForPhoto'}>
              <img src={photo} alt="button" />
            </button>
          </div>
          <EditableSpan />
          <H4>{email}</H4>
          <LogOutButton className={'logOutBtn'} onClick={logOut}>
            <IoMdLogOut className={'logOutIcon'} />
            Log out
          </LogOutButton>
        </StyledPersonalInformation>
      </StyledPersonalFormWrapper>
    </>
  )
}
