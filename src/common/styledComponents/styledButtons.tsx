import React from 'react'

import styled from 'styled-components'

export const StyledPrimaryFormButton = (props: PropsType) => {
  return <StyledButton>{props.text}</StyledButton>
}

//styled component
export const StyledButton = styled.button`
  width: 100%;
  height: 36px;
  background: ${({ theme }) => theme.colors.buttonPrimaryBg};
  box-shadow: 0 4px 18px rgba(54, 110, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.colorWhite};
  &:hover {
    cursor: pointer;
  }
`

// types
type PropsType = {
  text: string
}
