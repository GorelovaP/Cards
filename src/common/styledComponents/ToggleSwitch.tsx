import React, { useState } from 'react'

import { ToggleBtn } from './styledButtons'
import { StyledLabel } from './styledLabel'

export const ToggleSwitch = () => {
  let [disabled, setDisabled] = useState(true)
  const onClickMe = () => {
    setDisabled(!disabled)
  }
  const onClickAll = () => {
    setDisabled(!disabled)
  }

  return (
    <div>
      <StyledLabel>Show packs cards</StyledLabel>
      <div>
        <ToggleBtn disabled={disabled} position="left" onClick={onClickMe}>
          My
        </ToggleBtn>
        <ToggleBtn position="right" disabled={!disabled} onClick={onClickAll}>
          All
        </ToggleBtn>
      </div>
    </div>
  )
}
