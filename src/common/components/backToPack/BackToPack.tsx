import React from 'react'

import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { setFirstRenderAC } from '../../../app/app-reducer'
import { PATH } from '../../../app/routes/PagesRoutes'
import { useAppDispatch } from '../../hooks/appHooks'

import { BackToPackArea } from './styledBackToPack'
type propsType = {
  callback?: () => void
}

export const BackToPack = (props: propsType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const goToCards = () => {
    dispatch(setFirstRenderAC(true))
    props.callback && props.callback()
    navigate(PATH.HOME_PAGE)
  }

  return (
    <BackToPackArea onClick={goToCards}>
      <BiArrowBack className={'icon'} />
      <span>Back to Packs List</span>
    </BackToPackArea>
  )
}
