import React, { DetailedHTMLProps, InputHTMLAttributes, memo } from 'react'

import { StyledCheckboxItem } from './styledCheckBox'

export const MyCheckBox: React.FC<PropsType> = memo(({ type, labelValue, ...restProps }) => {
  return (
    <StyledCheckboxItem>
      <label>
        <input className={'checkbox'} type={'checkbox'} {...restProps} />
        <span className={'labelValue'}>{labelValue}</span>
      </label>
    </StyledCheckboxItem>
  )
})

// types
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type PropsType = DefaultInputPropsType & {
  labelValue: string
}
