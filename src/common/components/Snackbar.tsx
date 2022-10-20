import React from 'react'

import { VscChromeClose } from 'react-icons/vsc'
import styled from 'styled-components'

import { setAppErrorAC } from '../../app/app-reducer'
import { useAppDispatch } from '../../app/hooks'

type SnackbarPropsType = {
  text: string
  color: string
}
export const Snackbar = (props: SnackbarPropsType) => {
  const dispatch = useAppDispatch()
  const onClickAction = () => {
    dispatch(setAppErrorAC(''))
  }

  return (
    <SnackbarArea color={props.color}>
      <span className={'error'}>{props.text}</span>
      <VscChromeClose onClick={onClickAction} size={'20px'} />
    </SnackbarArea>
  )
}
const SnackbarArea = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 20px;
  padding: 5px 10px 5px 5px;
  left: 20px;
  background: ${props => props.color};
  color: white;
  border-radius: 20px;

  .error {
    padding: 5px 15px;
  }
`
