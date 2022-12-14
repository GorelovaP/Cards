import React, { useEffect, useState } from 'react'

import { setFirstRenderAC } from '../../app/app-reducer'
import {
  changeToggleAC,
  getPackTC,
  resetFilterAC,
  setCurrentPageAC,
  setMinMaxAC,
  setPageCountAC,
  sortUpdatedAC,
} from '../../app/pack-reducer'
import removeFilter from '../../assets/images/Filter-Remove.png'
import { DoubleRange } from '../../common/components/doubleRange/DoubleRange'
import { Paginator } from '../../common/components/paginator/Paginator'
import { Search } from '../../common/components/search/Search'
import { ToggleSwitch } from '../../common/components/toggleSwitch/ToggleSwitch'
import { useAppDispatch, useAppSelector } from '../../common/hooks/appHooks'
import { StyleButtonForMainPageHeader } from '../../common/styledComponents/styledButtons'
import { H1, NoData } from '../../common/styledComponents/styledHeaders'
import {
  StyledFeaturesWrapper,
  StyledMainPageWrapper,
  StyledPageHeaderWrapper,
} from '../../common/styledComponents/styledWrappers'

import { AddNewPacksModal } from './packsModal/addNewPacksModal/AddNewPacksModal'
import { PacksTable } from './packsTable/PacksTable'
import { StyledPacksPage } from './styledPacksPage'

export const PacksPage = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.app.isLoading)
  const sortSettings = useAppSelector(state => state.packs.sort)
  const totalItemsCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const currentPage = useAppSelector(state => state.packs.page)
  const meOrAll = useAppSelector(state => state.packs.meOrAll)
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const min = useAppSelector(state => state.packs.min)
  const max = useAppSelector(state => state.packs.max)
  const searchData = useAppSelector(state => state.packs.searchData)
  const firstRender = useAppSelector(state => state.app.firstRender)

  const [openPacksModal, setOpenPacksModal] = useState(false)

  useEffect(() => {
    if (!firstRender) {
      dispatch(setFirstRenderAC(true))
    }
    dispatch(getPackTC())
  }, [searchData, min, max, sortSettings, currentPage, pageCount, meOrAll])

  const setPacksModalClose = () => {
    setOpenPacksModal(false)
  }

  const setCurrentItem = (item: number) => {
    dispatch(setCurrentPageAC(item))
  }

  const changeFieldsNumber = (fieldsNumber: number) => {
    dispatch(setPageCountAC(fieldsNumber))
    dispatch(setCurrentPageAC(1))
  }

  const onClickHandler = () => {
    setOpenPacksModal(true)
  }

  const resetFilter = () => {
    dispatch(resetFilterAC(true))
    dispatch(setPageCountAC(4))
    dispatch(setCurrentPageAC(1))
    dispatch(changeToggleAC('all'))
    dispatch(sortUpdatedAC('0updated'))
    dispatch(setMinMaxAC(minCardsCount, maxCardsCount))
  }

  return (
    <StyledPacksPage>
      <StyledMainPageWrapper className="mainPageWrapper">
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
        {totalItemsCount === 0 ? (
          <NoData>Sorry, there are no such packages</NoData>
        ) : (
          <Paginator
            totalItemsCount={totalItemsCount}
            pageCount={pageCount}
            currentItem={currentPage}
            setCurrentItem={setCurrentItem}
            ChangeFieldsNumber={changeFieldsNumber}
          />
        )}
        {openPacksModal && <AddNewPacksModal open={openPacksModal} onClose={setPacksModalClose} />}
      </StyledMainPageWrapper>
    </StyledPacksPage>
  )
}
