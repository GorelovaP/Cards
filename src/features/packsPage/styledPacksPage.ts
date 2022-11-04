import styled from 'styled-components'

export const StyledPacksPage = styled.div`
  .mainPageWrapper {
    margin-top: 99px;
  }

  .mainPageSearch {
    width: 413px;
    margin-right: 24px;
  }

  .filterBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    margin-left: 36px;
    height: 35px;
    width: 40px;
    background: white;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    cursor: pointer;
    &:disabled:hover,
    &:disabled {
      background: white;
      opacity: 0.5;
    }

    &:hover {
      background: #d9d9d9;
    }
  }
`
