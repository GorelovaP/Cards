import React from 'react'

import { changeToggleAC, getPackTC, sortUpdatedAC } from '../../../app/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks'
import { ToggleBtn } from '../../styledComponents/styledButtons'
import { StyledLabel } from '../../styledComponents/styledLabel'

export const ToggleSwitch = () => {
  const dispatch = useAppDispatch()
  let userid = useAppSelector(state => state.user.user._id)
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
      <div>
        <ToggleBtn disabled={meOrAll !== 'all'} position={'left'} onClick={onClickMe}>
          My
        </ToggleBtn>
        <ToggleBtn position={'right'} disabled={meOrAll !== 'me'} onClick={onClickAll}>
          All
        </ToggleBtn>
      </div>
    </div>
  )
}
