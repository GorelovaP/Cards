import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { addNewPackTC, getPackTC, resetFilterAC } from '../../app/pack-reducer'
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
  const userid = useAppSelector(state => state.user.user._id)
  const sortSettings = useAppSelector(state => state.packs.sort)
  const totalItemsCount = useAppSelector(state => state.packs.cardPacksTotalCount) //количество колод
  const pageCount = useAppSelector(state => state.packs.pageCount) //сколько вмещает страница
  const paginatorPortion = 5 //кол-во страниц отображающееся в пагинаторе
  const currentItem = useAppSelector(state => state.packs.page) // выбранная страница
  const meOrAll = useAppSelector(state => state.packs.meOrAll)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const searchData = useAppSelector(state => state.packs.searchData)

  const onClickHandler = async () => {
    await dispatch(addNewPackTC({ name: 'some pack...' }))

    if (meOrAll === 'all') {
      dispatch(
        getPackTC(
          undefined,
          minCardsCount,
          maxCardsCount,
          sortSettings,
          currentItem,
          pageCount,
          undefined,
          undefined
        )
      )
    } else {
      dispatch(
        getPackTC(
          undefined,
          minCardsCount,
          maxCardsCount,
          sortSettings,
          currentItem,
          pageCount,
          userid,
          undefined
        )
      )
    }
  }

  const resetFilter = () => {
    dispatch(getPackTC())
    dispatch(resetFilterAC(true))
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(getPackTC())
  }, [])

  const setCurrentItem = (item: number) => {
    if (meOrAll === 'me') {
      dispatch(
        getPackTC(
          undefined,
          minCardsCount,
          maxCardsCount,
          sortSettings,
          item,
          pageCount,
          userid,
          undefined
        )
      )
    } else {
      dispatch(
        getPackTC(
          searchData,
          minCardsCount,
          maxCardsCount,
          sortSettings,
          item,
          pageCount,
          undefined,
          undefined
        )
      )
    }
  }
  const changeFieldsNumber = (choice: number) => {
    if (meOrAll === 'me') {
      dispatch(
        getPackTC(
          undefined,
          minCardsCount,
          maxCardsCount,
          sortSettings,
          currentItem,
          choice,
          userid,
          undefined
        )
      )
    } else {
      dispatch(
        getPackTC(
          undefined,
          minCardsCount,
          maxCardsCount,
          sortSettings,
          currentItem,
          choice,
          undefined,
          undefined
        )
      )
    }
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
            paginatorPortion={paginatorPortion}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            ChangeFieldsNumber={changeFieldsNumber}
          />
        )}
      </StyledMainPageWrapper>
    </StyledPacksPage>
  )
}
