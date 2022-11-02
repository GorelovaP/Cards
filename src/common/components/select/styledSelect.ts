import styled from 'styled-components'

import arrow from '../../../assets/images/ArrowDown.svg'

export const StyledSelect = styled.div`
  .label {
    font-size: 13px;
    opacity: 0.5;
    display: block;
    margin-bottom: 8px;
  }
  .select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #dfe4e5;
    border-radius: 2px;
    margin-bottom: 23px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url(${arrow}) no-repeat right;
    background-position-x: calc(100% - 8px);
  }
  .option {
    padding: 8px 12px;
  }
`
