import React, { useState } from 'react'

//import { useAppSelector } from '../../../app/hooks'
import { StyledLabel } from '../../styledComponents/styledLabel'

import { StyledDoubleRange, StyledSlider } from './styledDoubleRange'

const minDistance = 1

export const DoubleRange = () => {
  // let min = useAppSelector(state => state.packs.minCardsCount)
  // let max = useAppSelector(state => state.packs.maxCardsCount)

  const [value1, setValue1] = useState<number[]>([0, 110])

  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]])
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)])
    }
  }

  return (
    <StyledDoubleRange>
      <StyledLabel>Number of cards</StyledLabel>
      <div className={'rangeBlock'}>
        <div className={'numberBlock'}>{value1[0]}</div>
        <StyledSlider
          value={value1}
          onChange={handleChange1}
          disableSwap
          sx={{
            width: 155,
            padding: 0,
          }}
        />
        <div className={'numberBlock'}>{value1[1]}</div>
      </div>
    </StyledDoubleRange>
  )
}
