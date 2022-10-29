import styled from 'styled-components'

export const StyledMyCardsTableHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0 12px 0 24px;
  background: #efefef;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 48px;
  .question {
    width: 344px;
  }
  .answer {
    width: 316px;
  }
  .lastUpdated {
    width: 136px;
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
  .grade {
    width: 132px;
  }
  .options {
    width: 44px;
  }
`
