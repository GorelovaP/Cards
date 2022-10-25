import React, { useEffect } from 'react'

import { GrFilter } from 'react-icons/gr'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getPackTC } from '../../app/pack-reducer'
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
  let totalItemsCount = useAppSelector(state => state.packs.cardPacksTotalCount) //количество колод
  let pageCount = useAppSelector(state => state.packs.pageCount) //сколько вмещает страница
  let paginatorPortion = 5 //кол-во страниц отображающееся в пагинаторе
  let currentItem = useAppSelector(state => state.packs.page) // выбранная страница

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(getPackTC())
  }, [])

  const setCurrentItem = (item: number) => {
    console.log(`Теперь текущей страницей была бы страница ${item}`)
    //ререндер на тойй страницы, кот  выбрали
  }
  const ChangeFieldsNumber = (choice: number) => {
    console.log(`сейчас поменяли количество элементов на странице ${choice}`)
    dispatch(
      getPackTC(undefined, undefined, undefined, undefined, undefined, choice, undefined, undefined)
    )
  }

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
          pageCount={pageCount}
          paginatorPortion={paginatorPortion}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          ChangeFieldsNumber={ChangeFieldsNumber}
        />
      </StyledMainPageWrapper>
    </StyledPacksList>
  )
}
