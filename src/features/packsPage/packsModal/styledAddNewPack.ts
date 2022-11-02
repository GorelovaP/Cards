import styled from 'styled-components'

export const StyledAddNewPack = styled.div`
  .myCheckBox {
    padding-top: 5px;
    margin-bottom: 35px;
  }
  .buttonsContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .cancel,
  .save {
    width: 113px;
    &:first-child {
      background-color: #fcfcfc;
      color: black;
    }
  }
`
