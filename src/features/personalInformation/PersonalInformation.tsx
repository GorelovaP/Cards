import React from 'react'

import { IoMdLogOut } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

import { singOutTC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import avatar from '../../assets/images/avatar.png'
import photo from '../../assets/images/photo.png'
import { BackToPack } from '../../common/components/backToPack/BackToPack'
import { LogOutButton } from '../../common/styledComponents/styledButtons'
import { H2, H4 } from '../../common/styledComponents/styledHeaders'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'
import { PATH } from '../routes/PagesRoutes'

import { EditableSpan } from './EditableSpan'
import { StyledPersonalInformation } from './styledPersonalInformation'

export const PersonalInformation = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  let isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  let email = useAppSelector(state => state.user.user.email)

  const logOut = () => {
    dispatch(singOutTC())
  }

  if (!isLoggedIn) {
    navigate(PATH.LOGIN)
  }

  return (
    <>
      <BackToPack />
      <StyledSingFormWrapper>
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
      </StyledSingFormWrapper>
    </>
  )
}
