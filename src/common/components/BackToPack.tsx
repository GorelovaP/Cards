import { memo } from 'react'

import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const BackToPack = memo(() => {
  const navigate = useNavigate()
  const goToCards = () => {
    navigate('/cards')
  }

  return (
    <BackToPackArea onClick={goToCards}>
      <BiArrowBack className={'icon'} />
      <span>Back to Packs List</span>
    </BackToPackArea>
  )
})

// styled component
const BackToPackArea = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 84px;
  line-height: 24px;

  span {
    padding-left: 12px;
  }
`
