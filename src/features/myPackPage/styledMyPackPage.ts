import styled from 'styled-components'

import { StyledMainPageWrapper } from '../../common/styledComponents/styledWrappers'

export const StyledMyPackPage = styled(StyledMainPageWrapper)`
  H1 {
    display: inline-block;
  }
  img {
    position: relative;
    top: 5px;
    left: 6px;
    &:hover {
      cursor: pointer;
    }
  }
`
