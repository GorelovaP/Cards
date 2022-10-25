import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { changeToggleAC, getPackTC } from '../../../app/pack-reducer'
import { ToggleBtn } from '../../styledComponents/styledButtons'
import { StyledLabel } from '../../styledComponents/styledLabel'

export const ToggleSwitch = () => {
  const dispatch = useAppDispatch()
  let userid = useAppSelector(state => state.user.user._id)
  let pageCount = useAppSelector(state => state.packs.pageCount)
  let meOrAll = useAppSelector(state => state.packs.meOrAll)

  const onClickMe = () => {
    dispatch(changeToggleAC('me'))
    dispatch(
      getPackTC(undefined, undefined, undefined, undefined, undefined, pageCount, userid, undefined)
    )
  }
  const onClickAll = () => {
    dispatch(changeToggleAC('all'))
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
      <div>
        <ToggleBtn disabled={meOrAll !== 'all'} position="left" onClick={onClickMe}>
          My
        </ToggleBtn>
        <ToggleBtn position="right" disabled={meOrAll !== 'me'} onClick={onClickAll}>
          All
        </ToggleBtn>
      </div>
    </div>
  )
}
