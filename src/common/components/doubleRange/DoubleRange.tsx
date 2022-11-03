import React, { useEffect, useState } from 'react'

import { setMinMaxAC } from '../../../app/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks'
import { StyledLabel } from '../../styledComponents/styledLabel'

import { StyledDoubleRange, StyledSlider } from './styledDoubleRange'

const minDistance = 1

export const DoubleRange = () => {
  const isLoading = useAppSelector(state => state.app.isLoading)
  const staticMin = useAppSelector(state => state.packs.minCardsCount)
  const staticMax = useAppSelector(state => state.packs.maxCardsCount)
  const min = useAppSelector(state => state.packs.min)
  const max = useAppSelector(state => state.packs.max)

  const dispatch = useAppDispatch()

  const [value, setValue1] = useState<number[]>([min ? min : staticMin, max ? max : staticMax])

  console.log(staticMin, staticMax)
  console.log(value)

  useEffect(() => {
    setValue1([staticMin, staticMax])
  }, [staticMin, staticMax])

  useEffect(() => {
    setValue1([min!, max!])
  }, [min, max])

  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value[1] - minDistance), value[1]])
    } else {
      setValue1([value[0], Math.max(newValue[1], value[0] + minDistance)])
    }
  }

  const setMinMax = () => {
    dispatch(setMinMaxAC(value[0], value[1]))
  }

  return (
    <StyledDoubleRange>
      <StyledLabel>Number of cards</StyledLabel>
      <div className={'rangeBlock'}>
        <div className={'numberBlock'}>{value[0]}</div>
        <StyledSlider
          disabled={isLoading}
          value={value}
          min={staticMin}
          max={staticMax}
          onChange={handleChange1}
          onMouseUp={setMinMax}
          disableSwap
          sx={{
            width: 155,
            padding: 0,
          }}
        />
        <div className={'numberBlock'}>{value[1]}</div>
      </div>
    </StyledDoubleRange>
  )
}
