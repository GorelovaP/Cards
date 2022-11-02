import styled from 'styled-components'

export const H1 = styled.h1`
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
`

export const H2 = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 32px;
  text-align: center;
`

export const H3 = styled.h3`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  opacity: 0.5;
`

export const H4 = styled.h4`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  opacity: 0.5;
`

export const FormInfoText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  opacity: 0.5;
`
export const NoData = styled(H4)`
  font-size: 18px;
  margin-top: 50px;
`

// for Sign forms common bottom styled link
export const StyledBottomFormLink = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  text-decoration-line: underline;
  color: ${({ theme }) => theme.colors.buttonPrimaryBg};
  .bottomFormLink {
    color: ${({ theme }) => theme.colors.buttonPrimaryBg};
  }
`
