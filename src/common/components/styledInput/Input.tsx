import React, { createElement, DetailedHTMLProps, InputHTMLAttributes, memo } from 'react'

import { IconType } from 'react-icons'

import { StyledInputItem } from './styledInput'

export const StyledInput: React.FC<PropsType> = memo(
  ({ text, label, onClickAction, icon, ...restProps }) => {
    return (
      <StyledInputItem>
        {label && <label className={'label'}>{label}</label>}
        <input type={text} {...restProps} />
        <span className={'line'} />
        <span className={'ItemIcon'} onClick={onClickAction}>
          {icon && createElement(icon)}
        </span>
      </StyledInputItem>
    )
  }
)

// types
type PropsType = DefaultInputPropsType & {
  text: string
  label?: string
  icon?: IconType
  onClickAction?: () => void
}
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
