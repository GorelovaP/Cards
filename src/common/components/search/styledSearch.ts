import styled from 'styled-components'

export const StyledSearch = styled.div`
  width: 100%;
  position: relative;
  font-size: 14px;

  input {
    padding: 7px 16px 7px 44px;
    width: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
  input::placeholder {
    font-weight: 400;
    line-height: 24px;
    opacity: 0.5;
  }
  .searchIcon {
    color: #d9d9d9;
    position: absolute;
    left: 16px;
    top: 35px;
    width: 16px;
    height: 16px;
  }
`
