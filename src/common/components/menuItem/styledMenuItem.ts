import styled from 'styled-components'

export const StyledMenuItem = styled.div`
  line-height: 36px;
  display: flex;
  flex-direction: row;
  img {
    margin: 0 12px 0 14px;
  }
  span {
    &:hover {
      cursor: pointer;
    }
  }
`

export const StyledMenuItemContainer = styled.div`
  z-index: 2;
  width: 116px;
  padding: 16px 0 12px;
  background-color: ${({ theme }) => theme.colors.colorWhite};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  left: 45px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.01em;
`
