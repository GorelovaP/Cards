import styled from 'styled-components'

import { StyledMenuItemContainer } from '../../../common/components/menuItem/styledMenuItem'
import { StyledMainPageWrapper } from '../../../common/styledComponents/styledWrappers'

export const StyledMyPackPage = styled(StyledMainPageWrapper)`
  H1 {
    max-width: 700px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis !important;
    position: relative;
    top: 5px;
    left: 0;
  }
  .menuPosition {
    position: relative;
  }
  .menuIcon {
    position: relative;
    top: 5px;
    left: 6px;
    &:hover {
      cursor: pointer;
    }
  }
`

export const StyledMenuItemMyPackContainer = styled(StyledMenuItemContainer)`
  top: 35px;
  left: -88px;
  padding-bottom: 5px;
  &:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-top: 1px solid #cfcfcf;
    border-left: 1px solid #cfcfcf;
    top: -5px;
    left: calc(50% - -43px);
    transform: rotate(45deg);
    background: ${({ theme }) => theme.colors.colorWhite};
  }
  span {
    padding-left: 10px;
    &:active {
      padding-left: 9px;
    }
  }
`
