import styled from 'styled-components'

export const StyledPacksListTableHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0 36px 0 39px;
  background: #efefef;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 48px;
  .name {
    width: 262px;
  }
  .cards {
    width: 231px;
  }
  .lastUpdated {
    width: 216px;
    position: relative;
    img {
      position: absolute;
      top: 21px;
      left: 113px;
    }
    .reverse {
      rotate: 180deg;
    }
    &:hover {
      cursor: pointer;
    }
    &:active {
      line-height: 50px;
    }
  }
  .createdBy {
    width: 155px;
  }
  .actions {
    width: 44px;
  }
`
