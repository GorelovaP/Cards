import styled from 'styled-components'

export const DropDownContainer = styled('div')`
  .label {
    font-size: 13px;
    opacity: 0.5;
    display: block;
    margin-bottom: 8px;
  }

  .dropDownHeader {
    position: relative;
    width: 100%;
    padding: 8px 12px;
    margin-bottom: 24px;
    border: 1px solid #dfe4e5;
    border-radius: 2px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
  }
  .icon {
    position: absolute;
    right: 12px;
    top: 10px;
  }
  .dropDownList {
    transform: translateY(-24px);
    width: calc(100% - 48px);
    position: absolute;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    border-top: 0;
    box-sizing: border-box;
    z-index: 10;
  }
  .listItem {
    padding: 8px 12px;
    list-style: none;
    cursor: pointer;
    border-bottom: 1px solid #e5e5e5;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background: ${({ theme }) => theme.colors.buttonPrimaryBg};
      color: ${({ theme }) => theme.colors.colorWhite};
      border-radius: 2px;
    }
  }
`
