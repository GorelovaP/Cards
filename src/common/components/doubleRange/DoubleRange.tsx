import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getPackTC, setMinMaxAC } from '../../../app/pack-reducer'
import { StyledLabel } from '../../styledComponents/styledLabel'

import { StyledDoubleRange, StyledSlider } from './styledDoubleRange'

const minDistance = 1

export const DoubleRange = () => {
  let min = useAppSelector(state => state.packs.minCardsCount)
  let max = useAppSelector(state => state.packs.maxCardsCount)
  let currentItem = useAppSelector(state => state.packs.page)
  let pageCount = useAppSelector(state => state.packs.pageCount)
  let meOrAll = useAppSelector(state => state.packs.meOrAll)
  let userid = useAppSelector(state => state.user.user._id)
  let dispatch = useAppDispatch()

  const [value, setValue1] = useState<number[]>([min, max])

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
    if (meOrAll === 'me') {
      dispatch(getPackTC(undefined, value[0], value[1], undefined, currentItem, pageCount, userid))
    } else
      dispatch(
        getPackTC(undefined, value[0], value[1], undefined, currentItem, pageCount, undefined)
      )
  }

  return (
    <StyledDoubleRange>
      <StyledLabel>Number of cards</StyledLabel>
      <div className={'rangeBlock'}>
        <div className={'numberBlock'}>{value[0]}</div>
        <StyledSlider
          value={value}
          max={110}
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
