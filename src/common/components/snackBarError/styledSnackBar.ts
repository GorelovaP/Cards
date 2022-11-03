import styled from 'styled-components'

export const SnackbarArea = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 20px;
  padding: 5px 10px 5px 5px;
  left: 20px;
  background: ${props => props.color};
  color: #ffffff;
  border-radius: 20px;

  .error {
    padding: 5px 15px;
  }
  .cross {
    cursor: pointer;
    &:active {
      transform: translate(1px, 1px);
    }
  }
`
