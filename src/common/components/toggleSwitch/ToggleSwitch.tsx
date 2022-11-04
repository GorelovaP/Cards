import React from 'react'

import { changeToggleAC, setMinMaxAC, sortUpdatedAC } from '../../../app/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks'
import { ToggleBtn } from '../../styledComponents/styledButtons'
import { StyledLabel } from '../../styledComponents/styledLabel'

import { StyledToggleSwitch } from './styledToggleSwitch'

export const ToggleSwitch = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.app.isLoading)
  const meOrAll = useAppSelector(state => state.packs.meOrAll)

  const onClickMe = () => {
    dispatch(changeToggleAC('me'))
    dispatch(sortUpdatedAC('0updated'))
    dispatch(setMinMaxAC(undefined, undefined))
  }
  const onClickAll = () => {
    dispatch(changeToggleAC('all'))
    dispatch(sortUpdatedAC('0updated'))
    dispatch(setMinMaxAC(undefined, undefined))
  }

  return (
    <div>
      <StyledLabel>Show packs cards</StyledLabel>
      <StyledToggleSwitch>
        <ToggleBtn
          disabled={meOrAll !== 'all' || isLoading}
          className={`left ${meOrAll !== 'all' ? 'blue' : ''}`}
          onClick={onClickMe}
        >
          My
        </ToggleBtn>
        <ToggleBtn
          disabled={meOrAll !== 'me' || isLoading}
          className={`right ${meOrAll !== 'me' ? 'blue' : ''} `}
          onClick={onClickAll}
        >
          All
        </ToggleBtn>
      </StyledToggleSwitch>
    </div>
  )
}
