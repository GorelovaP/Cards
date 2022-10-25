import React from 'react'

import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../features/routes/PagesRoutes'

import { BackToPackArea } from './styledBackToPack'

export const BackToPack = () => {
  const navigate = useNavigate()
  const goToCards = () => {
    navigate(PATH.HOME_PAGE)
  }

  return (
    <BackToPackArea>
      <BiArrowBack className={'icon'} />
      <span onClick={goToCards}>Back to Packs List</span>
    </BackToPackArea>
  )
}
