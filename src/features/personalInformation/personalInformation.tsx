import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useAppSelector } from '../../app/hooks'
import avatar from '../../assets/images/avatar.png'
import edit from '../../assets/images/edit.svg'
import logOut from '../../assets/images/logout.svg'
import photo from '../../assets/images/photo.png'
import { BackToPack } from '../../common/styledComponents/BackToPack'
import { StyledButton } from '../../common/styledComponents/styledButtons'
import { H2, H4 } from '../../common/styledComponents/styledHeaders'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'

export const PersonalInformation = () => {
  const navigate = useNavigate()
  let user = useAppSelector(state => state.user.user)

  if (Object.keys(user).length === 0) {
    //проверка на пустоту, если объект будет пустой, то значит данные не записались в редюсер и значит, что не произошла логинезация
    navigate('/signin')
  }

  //Осталось:
  //добавить фотки в гит
  //отобразить данные которые пришли в редюсер
  //по кнопке лог аут выполнить разлогинезацию ( т е обнулить юзеровский редюсер и сделать свойство isLoggedIn в аус редюсере фолсовым)

  let [title, setTitle] = useState('wrwgfrsgfs')

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
          <div className={'title'}>
            {title}
            <button>
              <img src={edit} alt="edit" />
            </button>
          </div>
          <H4>email</H4>
          <LogOutButton>
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

    .title {
      text-align: center;
      position: center;
      margin-bottom: 14px;
    }
  }
`

const LogOutButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  width: 127px;
  height: 36px;
  background: #fcfcfc;
  box-shadow: 0 2px 10px rgba(109, 109, 109, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3);
`
