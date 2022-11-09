import styled from 'styled-components'

export const StyledUsersCardsTableItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0 24px;
  line-height: 48px;
  background-color: ${({ theme }) => theme.colors.colorWhite};
  border-bottom: 1px solid #d9d9d9;
  .question {
    display: flex;
    align-items: center;
    width: 344px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 20px;
    .nameText {
      display: flex;
      justify-content: center;
      flex-direction: column;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis !important;
      .image {
        max-height: 36px;
      }
    }
  }
  .answer {
    display: flex;
    align-items: center;
    width: 384px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 20px;
    .nameText {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis !important;
    }
  }
  .lastUpdated {
    display: flex;
    align-items: center;
    width: 136px;
  }
  .grade {
    display: flex;
    align-items: center;
    width: 96px;
  }
`
