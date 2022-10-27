import styled from 'styled-components'

export const StyledNoItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  height: 48px;
  padding: 0 24px;
  line-height: 48px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.colorWhite};
  border-bottom: 1px solid #d9d9d9;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1); ;
`
