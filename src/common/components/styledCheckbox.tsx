import React, { DetailedHTMLProps, InputHTMLAttributes, memo } from 'react'

import styled from 'styled-components'

import checked from '../../assets/images/Checked.svg'

export const StyledCheckbox: React.FC<PropsType> = memo(({ type, labelValue, ...restProps }) => {
  return (
    <StyledCheckboxItem>
      <label>
        <input className={'checkbox'} type={'checkbox'} {...restProps} />
        <span className={'labelValue'}>{labelValue}</span>
      </label>
    </StyledCheckboxItem>
  )
})

//styled component
export const StyledCheckboxItem = styled.div`
  margin-bottom: 28px;
  position: relative;

  .checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  .labelValue:before {
    content: '';
    top: 20px;
    display: inline-block;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    border: 1px solid ${({ theme }) => theme.colors.buttonPrimaryBg};
    border-radius: 20%;
    margin-right: 12px;
  }

  .checkbox:checked + .labelValue:before {
    content: '';
    display: block;
    background-image: url(${checked});
    background-size: 18px 18px;
    border: none;
  }

  .labelValue {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }
`

// types
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type PropsType = DefaultInputPropsType & {
  labelValue: string
}
