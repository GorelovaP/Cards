import styled from 'styled-components'

export const StyledMyCardsTableItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0 12px 0 24px;
  line-height: 48px;
  background-color: ${({ theme }) => theme.colors.colorWhite};
  border-bottom: 1px solid #d9d9d9;

  .question {
    width: 344px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 20px;
  }

  .answer {
    width: 316px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 20px;
  }

  .lastUpdated {
    width: 136px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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

      &:hover {
        cursor: pointer;
      }

      &:active {
        top: 16px;
        left: 1px;
      }
    }

    .editIsRestricted {
      position: absolute;
      top: 15px;
      left: 0;
      opacity: 0.5;
    }

    .delete {
      position: absolute;
      top: 15px;
      left: 30px;

      &:hover {
        cursor: pointer;
      }

      &:active {
        top: 16px;
        left: 31px;
      }
    }

    .deleteIsRestricted {
      position: absolute;
      top: 15px;
      left: 30px;
      opacity: 0.5;
    }
  }
`
