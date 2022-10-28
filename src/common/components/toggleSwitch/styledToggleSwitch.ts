import styled from 'styled-components'

export const StyledToggleSwitch = styled.div`
  .left {
    border-radius: 2px 0 0 2px;
  }
  .right {
    border-radius: 0 2px 2px 0;
  }
  .blue {
    background: ${({ theme }) => theme.colors.buttonPrimaryBg};
    color: white;
    border: 1px solid ${({ theme }) => theme.colors.buttonPrimaryBg};
  }
`
