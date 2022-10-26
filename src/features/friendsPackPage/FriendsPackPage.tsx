import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { getCardsTC, setCurrentFriendsPageAC } from '../../app/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { BackToPack } from '../../common/components/backToPack/BackToPack'
import { Paginator } from '../../common/components/paginator/Paginator'
import { Search } from '../../common/components/search/Search'
import { StyleButtonForMainPageHeader } from '../../common/styledComponents/styledButtons'
import { H1 } from '../../common/styledComponents/styledHeaders'
import {
  StyledFeaturesWrapper,
  StyledPageHeaderWrapper,
} from '../../common/styledComponents/styledWrappers'
import { PATH } from '../routes/PagesRoutes'

import { FriendsCardsTable } from './FriendsCardsTable/FriendsCardsTable'
import { StyledFriendsPackPage } from './styledFriendsPackPage'

export const FriendsPackPage = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  const dispatch = useAppDispatch()
  const chosenPack = useAppSelector(state => state.packs.chosenPack)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const paginatorPortion = 5
  const currentItem = useAppSelector(state => state.cards.page)

  useEffect(() => {
    dispatch(getCardsTC(undefined, undefined, chosenPack))
  }, [])

  const setCurrentItem = (item: number) => {
    dispatch(
      getCardsTC(undefined, undefined, chosenPack, undefined, undefined, undefined, item, pageCount)
    )
    dispatch(setCurrentFriendsPageAC(item))
  }
  const ChangeFieldsNumber = (choice: number) => {
    getCardsTC(
      undefined,
      undefined,
      chosenPack,
      undefined,
      undefined,
      undefined,
      currentItem,
      choice
    )
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }
  if (!chosenPack) {
    return <Navigate to={PATH.HOME_PAGE} />
  }

  return (
    <>
      <BackToPack />
      <StyledFriendsPackPage>
        <StyledPageHeaderWrapper>
          <div>
            <H1>Friend&apos;s Pack</H1>
          </div>
          <StyleButtonForMainPageHeader>Add new card</StyleButtonForMainPageHeader>
        </StyledPageHeaderWrapper>
        <StyledFeaturesWrapper>
          <Search className="mainPageSearch" />
        </StyledFeaturesWrapper>
        <FriendsCardsTable />
        {cardsTotalCount !== 0 && (
          <Paginator
            totalItemsCount={cardsTotalCount}
            pageCount={pageCount}
            paginatorPortion={paginatorPortion}
            setCurrentItem={setCurrentItem}
            currentItem={currentItem}
            ChangeFieldsNumber={ChangeFieldsNumber}
          />
        )}
      </StyledFriendsPackPage>
    </>
  )
}
