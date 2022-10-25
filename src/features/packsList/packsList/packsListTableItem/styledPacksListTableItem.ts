import styled from 'styled-components'

export const StyledPacksListTableItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0 36px 0 39px;
  line-height: 48px;
  background-color: ${({ theme }) => theme.colors.colorWhite};
  border-bottom: 1px solid #d9d9d9;
  .name {
    width: 262px;
  }
  .cards {
    width: 231px;
  }
  .lastUpdated {
    width: 216px;
  }
  .createdBy {
    width: 155px;
  }
  .actions {
    width: 44px;
    position: relative;
    .learn {
      position: absolute;
      top: 15px;
      left: 0;
    }
    .edit {
      position: absolute;
      top: 15px;
      left: 30px;
    }
    .delete {
      position: absolute;
      top: 15px;
      left: 60px;
    }
  }
`
