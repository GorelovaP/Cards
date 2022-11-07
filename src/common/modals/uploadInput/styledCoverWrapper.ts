import styled from 'styled-components'

export const StyledCoverWrapper = styled.div`
  .coverHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    span {
      color: ${({ theme }) => theme.colors.buttonPrimaryBg};
      text-decoration: underline;
      text-decoration-color: ${({ theme }) => theme.colors.buttonPrimaryBg};
      &:hover {
        cursor: pointer;
      }
      &:active {
        padding-right: 1px;
      }
    }
  }
  img {
    width: 100%;
    height: 150px;
  }
`
