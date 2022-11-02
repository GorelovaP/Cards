import styled from 'styled-components'

export const StyledDeletePackModal = styled.div`
  .buttonsContainer {
    margin-top: 35px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .delete {
    background-color: red;
    color: white;
  }
  .cancel,
  .delete {
    width: 113px;
    &:first-child {
      background-color: #fcfcfc;
      color: black;
    }
  }
`
