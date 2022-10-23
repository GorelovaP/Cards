import styled from 'styled-components'

//styled component
export const StyledButton = styled.button`
  width: 100%;
  height: 36px;
  background: ${({ theme }) => theme.colors.buttonPrimaryBg};
  box-shadow: 0 4px 18px rgba(54, 110, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.colorWhite};

  &:hover {
    cursor: pointer;
    transition: 0.3s;
    text-shadow: 1px 0 1px rgba(255, 255, 255, 1);
  }

  :active {
    position: relative;
    top: 2px;
    left: 0;
  }
`

export const StyleButtonFormAdjusted = styled(StyledButton)`
  margin: 60px 0 31px;
`
export const StyleButtonForHeader = styled(StyledButton)`
  padding: 0 28px;
`
export const StyleButtonForMainPageHeader = styled(StyledButton)`
  width: 184px;
`

export const LogOutButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  width: 127px;
  height: 36px;
  background: #fcfcfc;
  box-shadow: 0 2px 10px rgba(109, 109, 109, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3);
`
export const StyledInnerButton = styled(StyledButton)`
  position: relative;
  width: 52px;
  transform: translate(295px, -52px);
  padding: 0 10px;
  border-radius: 2px;
  text-transform: uppercase;
  box-shadow: none;
  height: 24px;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  z-index: 2;
`
type PropsBtnType = {
  position: 'left' | 'right'
}
export const ToggleBtn = styled.button<PropsBtnType>`
  width: 98px;
  height: 35px;
  //не понимаю, почему левой кнопке не задается бордер радиус??
  border-radius: ${props => (props.position == 'left' ? '2px 0px 0x 2px' : '0px 2px 2px 0px')};
  display: inline;
  text-align: center;
  background: white;
  color: black;
  border: 1px solid #d9d9d9;

  &:disabled {
    background: ${({ theme }) => theme.colors.buttonPrimaryBg};
    color: white;
    border: 1px solid ${({ theme }) => theme.colors.buttonPrimaryBg};
  }
  &:hover {
    border: 1px solid #366eff;
  }
`
