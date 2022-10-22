import styled from 'styled-components'

import { theme } from '../../common/styledComponents/theme'

export const StyledSignUpForm = styled.div`
  H2 {
    margin-bottom: 29px;
  }

  .imageContainer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    height: 108px;
    width: 108px;
    border-radius: 50%;
    border: 1px solid ${theme.colors.buttonPrimaryBg};
    background-color: rgba(${theme.colors.buttonPrimaryBgRGB}, 0.05);
  }

  .icon {
    margin-left: 4px;
  }

  H4 {
    font-weight: 400;
    margin: 31px 0 41px 0;
  }
  .checkEmailBtn {
    margin-bottom: 15px;
  }
`
