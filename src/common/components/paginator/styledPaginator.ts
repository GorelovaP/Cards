import styled from 'styled-components'

export const StyledPaginator = styled.div`
  margin-top: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .page {
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    margin: 0 12px;
  }

  .selectedPage {
    border-radius: 2px;
    color: white;
    background: ${({ theme }) => theme.colors.buttonPrimaryBg};
  }
  .paginatorBtn {
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .beforeSelect {
    margin: 0 5px 0 30px;
  }
`
