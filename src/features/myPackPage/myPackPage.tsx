import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { BackToPack } from '../../common/components/backToPack/BackToPack'
import { Search } from '../../common/components/search/Search'
import { StyleButtonForMainPageHeader } from '../../common/styledComponents/styledButtons'
import { H1 } from '../../common/styledComponents/styledHeaders'
import {
  StyledFeaturesWrapper,
  StyledPageHeaderWrapper,
} from '../../common/styledComponents/styledWrappers'
import { PATH } from '../routes/PagesRoutes'

import { StyledMyPackPage } from './styledMyPackPage'

export const MyPackPage = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <>
      <BackToPack />
      <StyledMyPackPage>
        <StyledPageHeaderWrapper>
          <H1>My Pack</H1>
          <StyleButtonForMainPageHeader>Add new card</StyleButtonForMainPageHeader>
        </StyledPageHeaderWrapper>
        <StyledFeaturesWrapper>
          <Search className="mainPageSearch" />
        </StyledFeaturesWrapper>
      </StyledMyPackPage>
    </>
  )
}
