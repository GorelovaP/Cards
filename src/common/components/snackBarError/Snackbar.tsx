import React, { memo } from 'react'

import { VscChromeClose } from 'react-icons/vsc'

import { setAppErrorAC } from '../../../app/app-reducer'
import { useAppDispatch } from '../../../app/hooks'

import { SnackbarArea } from './styledSnackBar'

export const Snackbar = memo((props: SnackbarPropsType) => {
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
})

// types
type SnackbarPropsType = {
  text: string
  color: string
}
