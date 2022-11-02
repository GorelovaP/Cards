import styled from 'styled-components'

import { StyledSingFormWrapper } from '../../styledComponents/styledWrappers'

export const StyledModalWrapper = styled(StyledSingFormWrapper)`
  width: 395px;
  height: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  .headerContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 19px 24px;
    border-bottom: 1px solid #d9d9d9;
    margin-bottom: 16px;
  }
  .closeIcon {
    height: 14px;
    width: 14px;
    cursor: pointer;
  }
  .mainContainer {
    padding: 19px 24px 47px;
  }
`
