import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { BackToPack } from '../../common/components/backToPack/BackToPack'
import { StyleButtonForMainPageHeader } from '../../common/styledComponents/styledButtons'
import { H1, H3 } from '../../common/styledComponents/styledHeaders'
import {
  StyledMainPageWrapper,
  StyledPageHeaderWrapper,
} from '../../common/styledComponents/styledWrappers'
import { PATH } from '../routes/PagesRoutes'

import { StyledNewEmptyPackPage } from './styledNewEmptyPackPage'

export const NewEmptyPackPage = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <>
      <BackToPack />
      <StyledNewEmptyPackPage>
        <StyledPageHeaderWrapper>
          <H1>New Pack Name</H1>
        </StyledPageHeaderWrapper>
        <div className={'centerContainer'}>
          <H3>This pack is empty. Click &lsquo;Add new card&lsquo; to fill this pack.</H3>
          <StyleButtonForMainPageHeader>Add new pack</StyleButtonForMainPageHeader>
        </div>
      </StyledNewEmptyPackPage>
    </>
  )
}
