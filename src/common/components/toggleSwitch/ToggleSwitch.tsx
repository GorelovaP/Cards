import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks'
import { changeToggleAC, getPackTC, sortUpdatedAC } from '../../../app/pack-reducer'
import { ToggleBtn } from '../../styledComponents/styledButtons'
import { StyledLabel } from '../../styledComponents/styledLabel'

import { StyledToggleSwitch } from './styledToggleSwitch'

export const ToggleSwitch = () => {
  const dispatch = useAppDispatch()
  let userid = useAppSelector(state => state.user.user._id)
  const isLoading = useAppSelector(state => state.app.isLoading)
  let pageCount = useAppSelector(state => state.packs.pageCount)
  let meOrAll = useAppSelector(state => state.packs.meOrAll)

  const onClickMe = () => {
    dispatch(changeToggleAC('me'))
    dispatch(sortUpdatedAC('0updated'))
    dispatch(
      getPackTC(undefined, undefined, undefined, undefined, undefined, pageCount, userid, undefined)
    )
  }
  const onClickAll = () => {
    dispatch(changeToggleAC('all'))
    dispatch(sortUpdatedAC('0updated'))
    dispatch(
      getPackTC(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        pageCount,
        undefined,
        undefined
      )
    )
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
          className={`right ${meOrAll !== 'me' ? 'blue' : ''}`}
          onClick={onClickAll}
        >
          All
        </ToggleBtn>
      </StyledToggleSwitch>
    </div>
  )
}
