import React from 'react'

import { StyledLoading } from './styledLoading'

export const Loading = () => {
  return (
    <StyledLoading>
      <div className={'loader'}>
        <div className={'innerOne'}> </div>
        <div className={'innerTwo'}> </div>
        <div className={'innerThree'}> </div>
      </div>
    </StyledLoading>
  )
}
