import React from 'react'

import { Navigate } from 'react-router-dom'

import { PATH } from '../../../app/routes/PagesRoutes'
import { BackToPack } from '../../../common/components/backToPack/BackToPack'
import { useAppSelector } from '../../../common/hooks/appHooks'
import { StyleButtonForMainPageHeader } from '../../../common/styledComponents/styledButtons'
import { H1, H3 } from '../../../common/styledComponents/styledHeaders'
import { StyledPageHeaderWrapper } from '../../../common/styledComponents/styledWrappers'

import { StyledEmptyPackPage } from './styledEmptyPackPage'

export const EmptyPackPage = (props: PropsType) => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <>
      <BackToPack />
      <StyledEmptyPackPage>
        <StyledPageHeaderWrapper>
          <H1>{props.chosenPackName}</H1>
        </StyledPageHeaderWrapper>
        <div className={'centerContainer'}>
          <H3>This pack is empty. Click &lsquo;Add new card&lsquo; to fill this pack.</H3>
          <StyleButtonForMainPageHeader onClick={props.addNewCard}>
            Add new pack
          </StyleButtonForMainPageHeader>
        </div>
      </StyledEmptyPackPage>
    </>
  )
}

type PropsType = {
  chosenPackName: string
  addNewCard: () => void
}
