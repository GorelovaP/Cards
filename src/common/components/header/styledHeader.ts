import styled from 'styled-components'

import { StyledMainWrapper } from '../../styledComponents/styledWrappers'

export const StyleHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fcfcfc;
  box-shadow: 0 2px 10px rgba(109, 109, 109, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  z-index: 20;
`
export const StyleHeaderSecond = styled(StyledMainWrapper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`
export const StyleHeaderRightIcons = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  .personalName {
    border-bottom: 1px dotted #000;
    text-decoration: none;
  }
  .personalIcon {
    margin-left: 12px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
    }
  }
`
