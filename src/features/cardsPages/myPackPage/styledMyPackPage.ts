import styled from 'styled-components'

import { StyledMenuItemContainer } from '../../../common/components/menuItem/styledMenuItem'
import { StyledMainPageWrapper } from '../../../common/styledComponents/styledWrappers'

export const StyledMyPackPage = styled(StyledMainPageWrapper)`
  H1 {
    display: inline-block;
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
`
