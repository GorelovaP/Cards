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
    &:hover {
      cursor: pointer;
    }
  }
  .cards {
    width: 231px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .lastUpdated {
    width: 216px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .createdBy {
    width: 155px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 20px;
  }
  .actions {
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
  }
`
