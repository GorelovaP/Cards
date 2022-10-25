import React, { useEffect } from 'react'

import { GrFilter } from 'react-icons/gr'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getPackTC, setCurrentPageAC } from '../../app/pack-reducer'
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
  let totalItemsCount = useAppSelector(state => state.packs.cardPacksTotalCount) //количество колод
  let pageCount = useAppSelector(state => state.packs.pageCount) //сколько вмещает страница
  let paginatorPortion = 5 //кол-во страниц отображающееся в пагинаторе
  let currentItem = useAppSelector(state => state.packs.page) // выбранная страница
  let meOrAll = useAppSelector(state => state.packs.meOrAll)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    if (meOrAll === 'all') {
      dispatch(
        getPackTC(undefined, undefined, undefined, undefined, currentItem, pageCount, undefined)
      )
    } else {
      dispatch(
        getPackTC(
          undefined,
          undefined,
          undefined,
          undefined,
          currentItem,
          pageCount,
          userid,
          undefined
        )
      )
    }
  }, [])

  const setCurrentItem = (item: number) => {
    console.log(`Теперь текущей страницей была бы страница ${item}`)

    if (meOrAll === 'me') {
      dispatch(
        getPackTC(undefined, undefined, undefined, undefined, item, pageCount, userid, undefined)
      )
    } else {
      debugger
      dispatch(
        getPackTC(undefined, undefined, undefined, undefined, item, pageCount, undefined, undefined)
      )
    }
    dispatch(setCurrentPageAC(item))
  }
  const ChangeFieldsNumber = (choice: number) => {
    console.log(`сейчас поменяли количество элементов на странице ${choice}`)
    if (meOrAll === 'me') {
      dispatch(
        getPackTC(
          undefined,
          undefined,
          undefined,
          undefined,
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
          undefined,
          undefined,
          undefined,
          currentItem,
          choice,
          undefined,
          undefined
        )
      )
    }
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
