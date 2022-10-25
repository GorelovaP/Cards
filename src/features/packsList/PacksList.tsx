import React from 'react'

import { GrFilter } from 'react-icons/gr'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
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
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  let totalItemsCount = 74 //всего колод
  let pageSize = 8 //сколько вмещает страница
  let paginatorPortion = 5 //кол-во страниц отображающееся в пагинаторе
  let currentItem = 4 // выбранная страница

  const setCurrentItem = (item: number) => {
    console.log(`Теперь текущей страницей была бы страница ${item}`)
    //ререндер на тойй страницы, кот  выбрали
  }

  const navigate = useNavigate()
  const onClickHandler = () => {
    navigate(PATH.NEW_EMPTY_PACK)
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
          <button className="filterBtn">
            <GrFilter />
          </button>
        </StyledFeaturesWrapper>
        <PacksListTable />
        <Paginator
          totalItemsCount={totalItemsCount}
          pageSize={pageSize}
          paginatorPortion={paginatorPortion}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
      </StyledMainPageWrapper>
    </StyledPacksList>
  )
}
