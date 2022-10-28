import styled from 'styled-components'

export const StyledSingFormWrapper = styled.div`
  width: 413px;
  height: 100%;
  padding: 33px;
  margin: 120px auto 0;
  background: ${({ theme }) => theme.colors.colorWhite};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`

export const StyledMainWrapper = styled.div`
  width: 1008px;
  margin: 0 auto;
`

export const StyledMainPageWrapper = styled.div`
  margin-top: 27px;
`

export const StyledPageHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .menuPositionWrapper {
    display: inline-block;
    position: relative;
  }
`
export const StyledFeaturesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 27px;
`
