import React from 'react'

import styled from 'styled-components'

import { theme } from '../styledComponents/theme'

export const Loading = () => {
  return (
    <StyledLoading>
      <div className={'loader'}>
        <div className={'innerOne'}> </div>
        <div className={'innerTwo'}> </div>
        <div className={'innerThree'}> </div>
      </div>
    </StyledLoading>
  )
}
const StyledLoading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    perspective: 800px;
    margin: 10px 30px;
  }

  .innerOne {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    left: 0;
    top: 0;
    animation: rotate-one 1s linear infinite;
    border-bottom: 3px solid #343434;
  }

  .innerTwo {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    right: 0;
    top: 0;
    animation: rotate-two 1s linear infinite;
    border-right: 3px solid red;
  }

  .innerThree {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    animation: rotate-three 1s linear infinite;
    border-top: 3px solid ${theme.colors.buttonPrimaryBg};
  }

  @keyframes rotate-one {
    0% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }

  @keyframes rotate-two {
    0% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }

  @keyframes rotate-three {
    0% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }
`
