import styled from 'styled-components'

export const StyledCardsTableItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0 12px 0 24px;
  line-height: 48px;
  background-color: ${({ theme }) => theme.colors.colorWhite};
  border-bottom: 1px solid #d9d9d9;
  .question {
    width: 344px;
  }
  .answer {
    width: 316px;
  }
  .lastUpdated {
    width: 136px;
  }
  .grade {
    width: 132px;
  }
  .options {
    width: 44px;
    position: relative;
    .edit {
      position: absolute;
      top: 15px;
      left: 0;
    }
    .delete {
      position: absolute;
      top: 15px;
      left: 30px;
    }
  }
`
