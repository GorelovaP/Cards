import React from 'react'

import { StyledLoadingWrapper } from './styledLoadingProgress'

export const LoadingProcess = () => {
  return (
    <StyledLoadingWrapper>
      <div className="loading">
        <div className="loading_line_wrapper">
          <div className="loading_line">
            <div className="loading_line_inner loading_line_inner--1"></div>
            <div className="loading_line_inner loading_line_inner--2"></div>
          </div>
        </div>
      </div>
    </StyledLoadingWrapper>
  )
}
