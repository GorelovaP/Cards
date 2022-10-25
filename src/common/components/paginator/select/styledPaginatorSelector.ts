import styled from 'styled-components'

export const StyledPaginatorSelect = styled.div`
  .select {
    margin-right: 5px;
    display: inline;
    height: 24px;
    width: 39px;

    border: 1px solid #d9d9d9;
    border-radius: 2px;
    background: #ffffff;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
  }
  .select option:checked {
    background: ${({ theme }) => theme.colors.buttonPrimaryBg};
    color: #ffffff;
  }
`
