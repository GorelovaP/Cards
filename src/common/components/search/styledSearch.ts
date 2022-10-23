import styled from 'styled-components'

export const StyledSearch = styled.div`
  width: 100%;
  font-size: 14px;
  .label {
    display: block;
    font-weight: 500;
    line-height: 17px;
    margin-bottom: 8px;
  }

  input {
    padding: 10px 16px;
    width: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
  input::placeholder {
    font-weight: 400;
    line-height: 24px;
    opacity: 0.5;
    margin-left: 8px;
  }
`
