import React from 'react'

import { IconType } from 'react-icons'
import styled from 'styled-components'

export const StyledInput = (props: PropsType) => {
  return (
    <StyledInputItem>
      <label>{props.label}</label>
      <input type={props.text} />
      <span className={'ItemIcon'}>{props.icon && <props.icon />}</span>
    </StyledInputItem>
  )
}

//styled component
export const StyledInputItem = styled.div`
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #000;
    background-color: transparent;
    color: inherit;
    outline: none;
  }
  label {
    opacity: 0.5;
  }
  .ItemIcon {
    display: none;
  }
`

// types
type PropsType = {
  text: string
  label: string
  icon?: IconType
}
