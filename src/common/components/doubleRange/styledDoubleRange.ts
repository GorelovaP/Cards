import Slider, { SliderProps } from '@mui/material/Slider/Slider'
import { alpha } from '@mui/material/styles'
import styled from 'styled-components'

import { theme } from '../../styledComponents/theme'

export const StyledSlider = styled(Slider)<SliderProps>(() => ({
  '& .MuiSlider-thumb': {
    height: 16,
    width: 16,
    border: `4px solid ${theme.colors.buttonPrimaryBg}`,
    color: 'white',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.colors.buttonPrimaryBg, 0.16)}`,
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 14px ${alpha(theme.colors.buttonPrimaryBg, 0.16)}`,
    },
  },
  '&.Mui-disabled  .MuiSlider-thumb': {
    border: `4px solid #ebebeb`,
  },
  '& .MuiSlider-rail': {
    color: alpha(theme.colors.buttonPrimaryBg, 0.5),
    width: 155,
  },

  '&.Mui-disabled .MuiSlider-track': {
    color: '#ebebeb',
  },
  '& .MuiSlider-track': {
    color: theme.colors.buttonPrimaryBg,
  },
}))

export const StyledDoubleRange = styled.div`
  margin-left: 48px;
  width: 251px;
  height: 62px;

  &:disabled {
    opacity: 0.5;
  }
  .rangeBlock {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .numberBlock {
    width: 35px;
    height: 35px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: black;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
`
