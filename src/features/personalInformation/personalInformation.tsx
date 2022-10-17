import React, { useState } from 'react'

import styled from 'styled-components'

import avatar from '../../assets/images/avatar.png'
import edit from '../../assets/images/edit.svg'
import photo from '../../assets/images/photo.png'
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
          {title}
          <button>
            <img src={edit} alt="edit" />
          </button>
        </div>
        <H4>email</H4>
        <ButtonStyle></ButtonStyle>
      </StyledPersonalInformation>
    </StyledSingFormWrapper>
  )
}

const StyledPersonalInformation = styled.div`
   {
    .photo {
      position: relative;
    }
    .avatar {
      border-radius: 50%;
      margin-left: 35px;
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
      left: 100px;
      border: 2px solid white;
    }
    .title {
      position: center;
      margin-bottom: 14px;
    }
  }
`

export const ButtonStyle = styled(StyledButton)`
  width: 127px;
  height: 36px;
  background: #fcfcfc;
  box-shadow: 0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3);
`
