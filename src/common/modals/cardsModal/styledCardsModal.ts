import styled from 'styled-components'

export const StyledCardsModal = styled.div`
  .buttonsContainer {
    margin-top: 35px;
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
      box-shadow: 0 2px 10px rgba(109, 109, 109, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
  }
  .error {
    color: red;
  }
`
