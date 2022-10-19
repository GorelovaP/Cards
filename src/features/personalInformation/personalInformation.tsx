import React, { useState } from 'react'

import styled from 'styled-components'

import avatar from '../../assets/images/avatar.png'
import edit from '../../assets/images/edit.svg'
import logOut from '../../assets/images/logout.svg'
import photo from '../../assets/images/photo.png'
import { EditableSpan } from '../../common/styledComponents/EditableSpan'
import { StyledButton, StyledPrimaryFormButton } from '../../common/styledComponents/styledButtons'
import { H2, H4 } from '../../common/styledComponents/styledHeaders'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'

export const PersonalInformation = () => {
  let [title, setTitle] = useState('wrwgfrsgfs')

  return (
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
          <EditableSpan title={title} onChange={setTitle} />
          {/*<button>/!*<img src={edit} alt="edit" />*!/</button>*/}
        </div>
        <H4>email</H4>
        <LogOutButton>
          <img src={logOut} alt="logOut" />
          Log out
        </LogOutButton>
      </StyledPersonalInformation>
    </StyledSingFormWrapper>
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
  box-shadow: 0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3);
`
