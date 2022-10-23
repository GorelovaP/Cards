import React, { useState } from 'react'

import { RangeSlider } from 'react-double-range-slider'
import { Output } from 'react-double-range-slider/dist/esm/components/RangeSlider/RangeSlider.types'

import { StyledLabel } from '../../styledComponents/styledLabel'

import { StyledDoubleRange } from './styledDoubleRange'

export const DoubleRange = () => {
  type sliderDataType = {
    min: number | string
    max: number | string
    minIndex: number
    maxIndex: number
  }
  const sliderData = {
    min: 0,
    max: 15,
    minIndex: 3,
    maxIndex: 10,
  }

  let [data, setData] = useState<sliderDataType>(sliderData)

  const onChangeRange = (e: Output) => {
    setData({
      min: e.min,
      max: e.max,
      minIndex: e.minIndex,
      maxIndex: e.maxIndex,
    })
  }

  return (
    <StyledDoubleRange>
      <StyledLabel>Number of cards</StyledLabel>
      <div className={'rangeBlock'}>
        <div className={'numberBlock'}>{data.minIndex}</div>
        <RangeSlider
          onChange={(e: Output) => onChangeRange(e)}
          value={{ min: sliderData.min, max: sliderData.max }}
          from={sliderData.minIndex}
          to={sliderData.maxIndex}
          tooltipVisibility={'never'}
        />
        <div className={'numberBlock'}>{data.maxIndex}</div>
      </div>
    </StyledDoubleRange>
  )
}
