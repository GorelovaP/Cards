import React from 'react'

import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { BackToPackArea } from './styledBackToPack'

export const BackToPack = () => {
  const navigate = useNavigate()
  const GoToCards = () => {
    navigate('/cards')
  }

  return (
    <BackToPackArea onClick={GoToCards}>
      <BiArrowBack className={'icon'} />
      <span>Back to Packs List</span>
    </BackToPackArea>
  )
}
