import React from 'react'

import { GrFilter } from 'react-icons/gr'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { DoubleRange } from '../../common/components/doubleRange/DoubleRange'
import { Search } from '../../common/components/search/Search'
import { ToggleSwitch } from '../../common/components/toggleSwitch/ToggleSwitch'
import { StyleButtonForMainPageHeader } from '../../common/styledComponents/styledButtons'
import { H1 } from '../../common/styledComponents/styledHeaders'
import {
  StyledFeaturesWrapper,
  StyledMainPageWrapper,
  StyledPageHeaderWrapper,
} from '../../common/styledComponents/styledWrappers'
import { PATH } from '../routes/PagesRoutes'

import { StyledPacksList } from './styledPacksList'

export const PacksList = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <StyledPacksList>
      <StyledMainPageWrapper className={'mainPageWrapper'}>
        <StyledPageHeaderWrapper>
          <H1>Packs list</H1>
          <StyleButtonForMainPageHeader>Add new pack</StyleButtonForMainPageHeader>
        </StyledPageHeaderWrapper>
        <StyledFeaturesWrapper>
          <Search className="mainPageSearch" />
          <ToggleSwitch />
          <DoubleRange />
          <button className="filterBtn">
            <GrFilter />
          </button>
        </StyledFeaturesWrapper>
      </StyledMainPageWrapper>
    </StyledPacksList>
  )
}
