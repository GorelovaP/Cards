import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { getCardsTC, setCurrentCardsPageAC, setPageCountCardsAC } from '../../../app/cards-reducer'
import { setCurrentPageAC, sortUpdatedAC } from '../../../app/pack-reducer'
import { PATH } from '../../../app/routes/PagesRoutes'
import { BackToPack } from '../../../common/components/backToPack/BackToPack'
import { LoadingProcess } from '../../../common/components/loadingProgress/LoadingProcess'
import { Paginator } from '../../../common/components/paginator/Paginator'
import { Search } from '../../../common/components/search/Search'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/appHooks'
import { StyleButtonForMainPageHeader } from '../../../common/styledComponents/styledButtons'
import { H1, H3 } from '../../../common/styledComponents/styledHeaders'
import {
  StyledFeaturesWrapper,
  StyledPageHeaderWrapper,
} from '../../../common/styledComponents/styledWrappers'

import { StyledUsersPackPage } from './styledUsersPackPage'
import { UsersCardsTable } from './usersCardsTable/UsersCardsTable'

export const UsersPackPage = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  const chosenPack = useAppSelector(state => state.packs.chosenPack)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const currentPage = useAppSelector(state => state.cards.page)
  const sortSettings = useAppSelector(state => state.cards.sortSettings)
  const chosenPackName = useAppSelector(state => state.cards.packName)
  const isLoading = useAppSelector(state => state.app.isLoading)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCardsTC())
  }, [sortSettings, currentPage, pageCount, chosenPack])

  const setCurrentItem = (item: number) => {
    dispatch(setCurrentCardsPageAC(item))
  }
  const changeFieldsNumber = (choice: number) => {
    dispatch(setPageCountCardsAC(choice))
    dispatch(setCurrentCardsPageAC(1))
  }

  const onExit = () => {
    dispatch(sortUpdatedAC('0updated'))
    dispatch(setPageCountCardsAC(4))
    dispatch(setCurrentCardsPageAC(1))
    dispatch(setCurrentPageAC(1))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }
  if (!chosenPack) {
    return <Navigate to={PATH.HOME_PAGE} />
  }

  if (isLoading) {
    return <LoadingProcess />
  } else {
    return (
      <>
        <BackToPack callback={onExit} />
        <StyledUsersPackPage>
          <StyledPageHeaderWrapper>
            <div>
              <H1>{chosenPackName}</H1>
            </div>
            {cardsTotalCount !== 0 && (
              <StyleButtonForMainPageHeader disabled={isLoading}>
                Learn this pack
              </StyleButtonForMainPageHeader>
            )}
          </StyledPageHeaderWrapper>
          {cardsTotalCount !== 0 ? (
            <>
              <StyledFeaturesWrapper>
                <Search className="mainPageSearch" />
              </StyledFeaturesWrapper>
              <UsersCardsTable />
              <Paginator
                totalItemsCount={cardsTotalCount}
                pageCount={pageCount}
                setCurrentItem={setCurrentItem}
                currentItem={currentPage}
                ChangeFieldsNumber={changeFieldsNumber}
              />
            </>
          ) : (
            <H3 className="emptyHeader">This pack is empty.</H3>
          )}
        </StyledUsersPackPage>
      </>
    )
  }
}
