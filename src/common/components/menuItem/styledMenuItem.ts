import styled from 'styled-components'

export const StyledMenuItem = styled.div<{ bg: string }>`
  line-height: 36px;
  background: url(${props => props.bg}) no-repeat 14% 50%;
  position: relative;
  padding-left: 40px;
  span {
    &:hover {
      cursor: pointer;
    }
    &:active {
      padding-left: 1px;
    }
  }
`

export const StyledMenuItemContainer = styled.div`
  z-index: 2;
  width: 116px;
  padding: 16px 0 12px;
  background-color: ${({ theme }) => theme.colors.colorWhite};
  border: 1px solid #cfcfcf;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  left: -7px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.01em;
  &:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-top: 1px solid #cfcfcf;
    border-left: 1px solid #cfcfcf;
    top: -5px;
    left: calc(50% - -35px);
    transform: rotate(45deg);
    background: ${({ theme }) => theme.colors.colorWhite};
  }
`
