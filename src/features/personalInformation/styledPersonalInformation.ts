import styled from 'styled-components'

export const StyledPersonalInformation = styled.div`
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
