import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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
