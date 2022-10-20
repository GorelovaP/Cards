import React from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { changeUserNameTC } from '../../app/user-reducer'
import avatar from '../../assets/images/avatar.png'
import logOut from '../../assets/images/logout.svg'
import photo from '../../assets/images/photo.png'
import { BackToPack } from '../../common/styledComponents/BackToPack'
import { EditableSpan } from '../../common/styledComponents/EditableSpan'
import { LogOutButton } from '../../common/styledComponents/styledButtons'
import { H2, H4 } from '../../common/styledComponents/styledHeaders'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'

export const PersonalInformation = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  let user = useAppSelector(state => state.user.user)
  let email = useAppSelector(state => state.user.user.email)
  let name = useAppSelector(state => state.user.user.name)

  if (user.email === '') {
    navigate('/signin')
  }

  //Осталось:
  //добавить фотки в гит
  //отобразить данные которые пришли в редюсер
  //по кнопке лог аут выполнить разлогинезацию ( т е обнулить юзеровский редюсер и сделать свойство isLoggedIn в аус редюсере фолсовым)

  const ChangeUserName = (title: string) => {
    dispatch(changeUserNameTC(title))
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

          <EditableSpan onChange={(title: string) => ChangeUserName(title)} title={name} />

          <H4>{email}</H4>
          <LogOutButton className={'logOutBtn'}>
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
