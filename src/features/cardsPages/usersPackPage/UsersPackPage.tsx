import React, { useEffect } from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import {
  getCardsTC,
  setCurrentCardsPageAC,
  setPageCountCardsAC,
  setSortSettingsAC,
} from '../../../app/cards-reducer'
import { setCurrentPageAC, setMinMaxAC } from '../../../app/pack-reducer'
import { PATH } from '../../../app/routes/PagesRoutes'
import { BackToPack } from '../../../common/components/backToPack/BackToPack'
import { Loading } from '../../../common/components/loading/Loading'
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
  const searchData = useAppSelector(state => state.cards.searchData)
  const staticMin = useAppSelector(state => state.packs.minCardsCount)
  const staticMax = useAppSelector(state => state.packs.maxCardsCount)
  const firstRender = useAppSelector(state => state.app.firstRender)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCardsTC())
  }, [sortSettings, currentPage, pageCount, chosenPack, searchData])

  const setCurrentItem = (item: number) => {
    dispatch(setCurrentCardsPageAC(item))
  }
  const changeFieldsNumber = (choice: number) => {
    dispatch(setPageCountCardsAC(choice))
    dispatch(setCurrentCardsPageAC(1))
  }

  const onExit = () => {
    dispatch(setSortSettingsAC('0updated'))
    dispatch(setPageCountCardsAC(4))
    dispatch(setCurrentCardsPageAC(1))
    dispatch(setCurrentPageAC(1))
    dispatch(setMinMaxAC(staticMin, staticMax))
  }

  const goToLearnPage = () => {
    navigate(PATH.LEARN)
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }
  if (!chosenPack) {
    return <Navigate to={PATH.HOME_PAGE} />
  }

  if (firstRender) {
    return <Loading />
  }

  return (
    <>
      <BackToPack callback={onExit} />
      <StyledUsersPackPage>
        <StyledPageHeaderWrapper>
          <div>
            <H1>{chosenPackName}</H1>
          </div>
          {cardsTotalCount !== 0 && (
            <StyleButtonForMainPageHeader onClick={goToLearnPage} disabled={isLoading}>
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
