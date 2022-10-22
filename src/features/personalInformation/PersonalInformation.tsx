import React from 'react'

import { IoMdLogOut } from 'react-icons/io'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'

import { singOutTC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import avatar from '../../assets/images/avatar.png'
import photo from '../../assets/images/photo.png'
import { BackToPack } from '../../common/components/backToPack/BackToPack'
import { LogOutButton } from '../../common/styledComponents/styledButtons'
import { H2, H4 } from '../../common/styledComponents/styledHeaders'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'

import { EditableSpan } from './EditableSpan'

export const PersonalInformation = () => {
  const dispatch = useAppDispatch()

  let isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  let email = useAppSelector(state => state.user.user.email)

  const logOut = () => {
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
          <LogOutButton className={'logOutBtn'} onClick={logOut}>
            <IoMdLogOut className={'logOutIcon'} />
            Log out
          </LogOutButton>
        </StyledPersonalInformation>
      </StyledSingFormWrapper>
    </>
  )
}

// styled component
const StyledPersonalInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
   {
    .photo {
      text-align: center;
      position: relative;
      height: 147px;
    }

    .avatar {
      border-radius: 50%;
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

    .logOutIcon {
      margin-right: 7px;
    }
  }
`
