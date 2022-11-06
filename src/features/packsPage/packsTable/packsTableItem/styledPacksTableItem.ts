import styled from 'styled-components'

export const StyledPacksTableItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0 36px 0 39px;
  line-height: 48px;
  background-color: ${({ theme }) => theme.colors.colorWhite};
  border-bottom: 1px solid #d9d9d9;

  .name {
    width: 262px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 20px;
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
    }
  }

  .cards {
    width: 231px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .lastUpdated {
    display: flex;
    align-items: center;
    width: 216px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .createdBy {
    display: flex;
    align-items: center;
    width: 155px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 20px;
  }

  .actions {
    display: flex;
    align-items: center;
    width: 44px;
    position: relative;

    .learn {
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

    .learnIsRestricted {
      position: absolute;
      top: 15px;
      left: 0;
      opacity: 0.5;
    }

    .edit {
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

    .editIsRestricted {
      position: absolute;
      top: 15px;
      left: 30px;
      opacity: 0.5;
    }

    .delete {
      position: absolute;
      top: 15px;
      left: 60px;

      &:hover {
        cursor: pointer;
      }

      &:active {
        top: 16px;
        left: 61px;
      }
    }

    .deleteIsRestricted {
      position: absolute;
      top: 15px;
      left: 60px;
      opacity: 0.5;
    }
  }
`
