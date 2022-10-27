import React, { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { addNewPackTC, getPackTC } from '../../app/pack-reducer'
import removeFilter from '../../assets/images/Filter-Remove.png'
import { DoubleRange } from '../../common/components/doubleRange/DoubleRange'
import { Paginator } from '../../common/components/paginator/Paginator'
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

import { PacksListTable } from './packsList/PacksListTable'
import { StyledPacksList } from './styledPacksList'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  let userid = useAppSelector(state => state.user.user._id)
  let sortSettings = useAppSelector(state => state.packs.sort)
  let totalItemsCount = useAppSelector(state => state.packs.cardPacksTotalCount) //количество колод
  let pageCount = useAppSelector(state => state.packs.pageCount) //сколько вмещает страница
  let paginatorPortion = 5 //кол-во страниц отображающееся в пагинаторе
  let currentItem = useAppSelector(state => state.packs.page) // выбранная страница
  let meOrAll = useAppSelector(state => state.packs.meOrAll)
  let maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  let minCardsCount = useAppSelector(state => state.packs.minCardsCount)

  const onClickHandler = () => {
    dispatch(addNewPackTC({ name: 'the last test I hope...' }))
  }
  const resetFilter = () => {
    dispatch(getPackTC())
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
          undefined,
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
  const ChangeFieldsNumber = (choice: number) => {
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
    <StyledPacksList>
      <StyledMainPageWrapper className={'mainPageWrapper'}>
        <StyledPageHeaderWrapper>
          <H1>Packs list</H1>
          <StyleButtonForMainPageHeader onClick={onClickHandler}>
            Add new pack
          </StyleButtonForMainPageHeader>
        </StyledPageHeaderWrapper>
        <StyledFeaturesWrapper>
          <Search className="mainPageSearch" />
          <ToggleSwitch />
          <DoubleRange />
          <button onClick={resetFilter} className="filterBtn">
            <img src={removeFilter} alt={'removeFilter'} />
          </button>
        </StyledFeaturesWrapper>
        <PacksListTable />
        {totalItemsCount !== 0 && (
          <Paginator
            totalItemsCount={totalItemsCount}
            pageCount={pageCount}
            paginatorPortion={paginatorPortion}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            ChangeFieldsNumber={ChangeFieldsNumber}
          />
        )}
      </StyledMainPageWrapper>
    </StyledPacksList>
  )
}
