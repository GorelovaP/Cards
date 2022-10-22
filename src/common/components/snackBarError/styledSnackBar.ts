import styled from 'styled-components'

export const SnackbarArea = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 20px;
  padding: 5px 10px 5px 5px;
  left: 20px;
  background: ${props => props.color};
  color: white;
  border-radius: 20px;

  .error {
    padding: 5px 15px;
  }
`
