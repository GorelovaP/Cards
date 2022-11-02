import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import {
  addNewPackTC,
  changeToggleAC,
  getPackTC,
  resetFilterAC,
  setCurrentPageAC,
  setMinMaxAC,
  setPageCountAC,
  sortUpdatedAC,
} from '../../app/pack-reducer'
import { PATH } from '../../app/routes/PagesRoutes'
import removeFilter from '../../assets/images/Filter-Remove.png'
import { DoubleRange } from '../../common/components/doubleRange/DoubleRange'
import { Paginator } from '../../common/components/paginator/Paginator'
import { Search } from '../../common/components/search/Search'
import { ToggleSwitch } from '../../common/components/toggleSwitch/ToggleSwitch'
import { useAppDispatch, useAppSelector } from '../../common/hooks/appHooks'
import { StyleButtonForMainPageHeader } from '../../common/styledComponents/styledButtons'
import { H1 } from '../../common/styledComponents/styledHeaders'
import {
  StyledFeaturesWrapper,
  StyledMainPageWrapper,
  StyledPageHeaderWrapper,
} from '../../common/styledComponents/styledWrappers'

import { PacksTable } from './packsTable/PacksTable'
import { StyledPacksPage } from './styledPacksPage'

export const PacksPage = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  const isLoading = useAppSelector(state => state.app.isLoading)
  const sortSettings = useAppSelector(state => state.packs.sort)
  const totalItemsCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const currentPage = useAppSelector(state => state.packs.page)
  const meOrAll = useAppSelector(state => state.packs.meOrAll)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const staticMax = useAppSelector(state => state.packs.staticMax)
  const staticMin = useAppSelector(state => state.packs.staticMin)
  const searchData = useAppSelector(state => state.packs.searchData)

  useEffect(() => {
    dispatch(getPackTC())
  }, [searchData, minCardsCount, maxCardsCount, sortSettings, currentPage, pageCount, meOrAll])

  const setCurrentItem = (item: number) => {
    dispatch(setCurrentPageAC(item))
  }

  const changeFieldsNumber = (fieldsNumber: number) => {
    dispatch(setPageCountAC(fieldsNumber))
    dispatch(setCurrentPageAC(1))
  }

  const onClickHandler = async () => {
    await dispatch(addNewPackTC({ name: 'some pack...' }))
  }

  const resetFilter = () => {
    dispatch(resetFilterAC(true))
    dispatch(setPageCountAC(4))
    dispatch(setCurrentPageAC(1))
    dispatch(changeToggleAC('all'))
    dispatch(sortUpdatedAC('0updated'))
    dispatch(setMinMaxAC(staticMin!, staticMax!))
    dispatch(sortUpdatedAC('0updated'))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <StyledPacksPage>
      <StyledMainPageWrapper className={'mainPageWrapper'}>
        <StyledPageHeaderWrapper>
          <H1>Packs list</H1>
          <StyleButtonForMainPageHeader onClick={onClickHandler} disabled={isLoading}>
            Add new pack
          </StyleButtonForMainPageHeader>
        </StyledPageHeaderWrapper>
        <StyledFeaturesWrapper>
          <Search className="mainPageSearch" />
          <ToggleSwitch />
          <DoubleRange />
          <button onClick={resetFilter} className="filterBtn" disabled={isLoading}>
            <img src={removeFilter} alt={'removeFilter'} />
          </button>
        </StyledFeaturesWrapper>
        <PacksTable />
        {totalItemsCount !== 0 && (
          <Paginator
            totalItemsCount={totalItemsCount}
            pageCount={pageCount}
            currentItem={currentPage}
            setCurrentItem={setCurrentItem}
            ChangeFieldsNumber={changeFieldsNumber}
          />
        )}
      </StyledMainPageWrapper>
    </StyledPacksPage>
  )
}
