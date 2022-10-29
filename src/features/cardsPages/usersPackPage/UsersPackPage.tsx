import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { getCardsTC, setCurrentCardsPageAC } from '../../../app/cards-reducer'
import { sortUpdatedAC } from '../../../app/pack-reducer'
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
  const dispatch = useAppDispatch()
  const chosenPack = useAppSelector(state => state.packs.chosenPack)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const paginatorPortion = 5
  const currentItem = useAppSelector(state => state.cards.page)
  const searchData = useAppSelector(state => state.packs.searchData)
  const chosenPackName = useAppSelector(state => state.cards.packName)
  let isLoading = useAppSelector(state => state.app.isLoading)

  useEffect(() => {
    dispatch(getCardsTC(undefined, undefined, chosenPack))
    dispatch(sortUpdatedAC('0updated'))
  }, [])

  const setCurrentItem = (item: number) => {
    dispatch(
      getCardsTC(
        undefined,
        searchData,
        chosenPack,
        undefined,
        undefined,
        undefined,
        item,
        pageCount
      )
    )
    dispatch(setCurrentCardsPageAC(item))
  }
  const ChangeFieldsNumber = (choice: number) => {
    dispatch(
      getCardsTC(
        undefined,
        searchData,
        chosenPack,
        undefined,
        undefined,
        undefined,
        currentItem,
        choice
      )
    )
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
        <BackToPack />
        <StyledUsersPackPage>
          <StyledPageHeaderWrapper>
            <div>
              <H1>{chosenPackName}</H1>
            </div>
            {cardsTotalCount !== 0 && (
              <StyleButtonForMainPageHeader>Learn this pack</StyleButtonForMainPageHeader>
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
                paginatorPortion={paginatorPortion}
                setCurrentItem={setCurrentItem}
                currentItem={currentItem}
                ChangeFieldsNumber={ChangeFieldsNumber}
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
