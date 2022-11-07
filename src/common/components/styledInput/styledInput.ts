import styled from 'styled-components'

export const StyledInputItem = styled.div`
  width: 100%;
  margin-bottom: 14px;
  position: relative;

  input {
    width: 100%;
    border: none;
    background-color: transparent;
    color: inherit;
    outline: none;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 4px;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }

  .line {
    display: block;
    width: 100%;
    border-bottom: 1px solid #000;
    opacity: 0.2;
  }

  label,
  input::placeholder {
    opacity: 0.5;
  }

  .label {
    font-size: 13px;
  }

  .ItemIcon {
    position: absolute;
    right: 0;
    bottom: 0;

    &:hover {
      cursor: pointer;
    }
  }
`
