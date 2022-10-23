import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { StyledSingFormWrapper } from '../../common/styledComponents/styledWrappers'
import { PATH } from '../routes/PagesRoutes'

export const MainPage = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return <StyledSingFormWrapper>ТАДАААМ, ВЫ НА КАРТОЧКАХ</StyledSingFormWrapper>
}
