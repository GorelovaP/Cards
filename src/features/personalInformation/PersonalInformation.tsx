import React from 'react'

import { Navigate } from 'react-router-dom'
import styled from 'styled-components'

import { singOutTC } from '../../app/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import avatar from '../../assets/images/avatar.png'
import logOut from '../../assets/images/logout.svg'
import photo from '../../assets/images/photo.png'
import { BackToPack } from '../../common/styledComponents/BackToPack'
import { EditableSpan } from '../../common/styledComponents/EditableSpan'
import { LogOutButton } from '../../common/styledComponents/styledButtons'
import { H2, H4 } from '../../common/styledComponents/styledHeaders'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'

export const PersonalInformation = () => {
  const dispatch = useAppDispatch()

  let isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  let email = useAppSelector(state => state.user.user.email)

  const LogOut = () => {
    dispatch(singOutTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={'/signin'} />
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
          <LogOutButton className={'logOutBtn'} onClick={LogOut}>
            <img src={logOut} alt="logOut" />
            Log out
          </LogOutButton>
        </StyledPersonalInformation>
      </StyledSingFormWrapper>
    </>
  )
}

const StyledPersonalInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
   {
    .photo {
      text-align: center;
      position: relative;
    }

    .avatar {
      border-radius: 50%;
      //margin-left: 35px;
      margin-top: 30px;
      height: 96px;
      width: 96px;
      margin-bottom: 17px;
    }

    .buttonForPhoto {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      position: absolute;
      top: 95px;
      left: 65px;
      border: 2px solid white;
    }

    .logOutBtn {
      margin: 29px 0 3px 0;
    }
  }
`
