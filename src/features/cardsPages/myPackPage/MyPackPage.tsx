import React, { useEffect, useState } from 'react'

import { ClickAwayListener } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'

import { addNewCardTC, getCardsTC, setCurrentCardsPageAC } from '../../../app/cards-reducer'
import {
  sortUpdatedAC,
  updatePackNameTC,
  changeToggleAC,
  deletePackTC,
} from '../../../app/pack-reducer'
import { PATH } from '../../../app/routes/PagesRoutes'
import deleteIcon from '../../../assets/images/menu/myPackMenu/Delete.svg'
import edit from '../../../assets/images/menu/myPackMenu/Edit.svg'
import learn from '../../../assets/images/menu/myPackMenu/teacher.svg'
import popUp from '../../../assets/images/popUp.svg'
import { BackToPack } from '../../../common/components/backToPack/BackToPack'
import { LoadingProcess } from '../../../common/components/loadingProgress/LoadingProcess'
import { MenuItem } from '../../../common/components/menuItem/MenuItem'
import { Paginator } from '../../../common/components/paginator/Paginator'
import { Search } from '../../../common/components/search/Search'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/appHooks'
import { StyleButtonForMainPageHeader } from '../../../common/styledComponents/styledButtons'
import { H1 } from '../../../common/styledComponents/styledHeaders'
import {
  StyledFeaturesWrapper,
  StyledPageHeaderWrapper,
} from '../../../common/styledComponents/styledWrappers'
import { EmptyPackPage } from '../emptyPackPage/EmptyPackPage'

import { MyCardsTable } from './myCardsTable/MyCardsTable'
import { StyledMenuItemMyPackContainer, StyledMyPackPage } from './styledMyPackPage'

export const MyPackPage = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  const dispatch = useAppDispatch()
  const chosenPack = useAppSelector(state => state.packs.chosenPack)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const paginatorPortion = 5
  const currentItem = useAppSelector(state => state.cards.page)
  const searchData = useAppSelector(state => state.packs.searchData)
  const chosenPackName = useAppSelector(state => state.cards.packName)
  const sortSettings = useAppSelector(state => state.packs.sort)
  const isLoading = useAppSelector(state => state.app.isLoading)
  const navigate = useNavigate()

  const [show, setShow] = useState(false)

  useEffect(() => {
    dispatch(changeToggleAC('all'))
    dispatch(sortUpdatedAC('0updated'))
    dispatch(getCardsTC(undefined, undefined, chosenPack))
  }, [])

  if (chosenPack === '') {
    navigate(PATH.HOME_PAGE)
  }

  const popUpHandler = () => {
    setShow(!show)
  }
  const handleClickAway = () => {
    setShow(false)
  }

  const addNewCard = async () => {
    await dispatch(
      addNewCardTC({ cardsPack_id: chosenPack, question: 'question1', answer: 'answer1' })
    )
    dispatch(
      getCardsTC(
        undefined,
        undefined,
        chosenPack,
        undefined,
        undefined,
        sortSettings,
        currentItem,
        pageCount
      )
    )
  }

  const deleteMyPack = () => {
    dispatch(deletePackTC(chosenPack))
    setShow(false)
  }

  const updatePackName = () => {
    dispatch(updatePackNameTC({ _id: chosenPack, name: 'updated pack title' }, true))
    setShow(false)
  }

  const setCurrentItem = (item: number) => {
    dispatch(
      getCardsTC(
        undefined,
        searchData,
        chosenPack,
        undefined,
        undefined,
        sortSettings,
        item,
        pageCount
      )
    )
    dispatch(setCurrentCardsPageAC(item))
  }
  const changeFieldsNumber = (choice: number) => {
    dispatch(
      getCardsTC(
        undefined,
        undefined,
        chosenPack,
        undefined,
        undefined,
        sortSettings,
        currentItem,
        choice
      )
    )
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  if (isLoading) {
    return <LoadingProcess />
  }

  if (cardsTotalCount === 0) {
    return <EmptyPackPage chosenPackName={chosenPackName} addNewCard={addNewCard} />
  } else {
    return (
      <>
        <BackToPack />
        <StyledMyPackPage>
          <StyledPageHeaderWrapper>
            <div className={'menuPosition'}>
              <H1>{chosenPackName}</H1>
              <div className={'menuPositionWrapper'}>
                <img src={popUp} alt="" className={'menuIcon'} onClick={popUpHandler} />
                {show && (
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <StyledMenuItemMyPackContainer>
                      <MenuItem text={'Edit'} icon={edit} onClickHandler={updatePackName} />
                      <MenuItem text={'Delete'} icon={deleteIcon} onClickHandler={deleteMyPack} />
                      <MenuItem text={'Learn'} icon={learn} onClickHandler={() => {}} />
                    </StyledMenuItemMyPackContainer>
                  </ClickAwayListener>
                )}
              </div>
            </div>
            <StyleButtonForMainPageHeader onClick={addNewCard} disabled={isLoading}>
              Add new card
            </StyleButtonForMainPageHeader>
          </StyledPageHeaderWrapper>
          <>
            <StyledFeaturesWrapper>
              <Search className="mainPageSearch" />
            </StyledFeaturesWrapper>
            <MyCardsTable />
            <Paginator
              totalItemsCount={cardsTotalCount}
              pageCount={pageCount}
              paginatorPortion={paginatorPortion}
              setCurrentItem={setCurrentItem}
              currentItem={currentItem}
              ChangeFieldsNumber={changeFieldsNumber}
            />
          </>
        </StyledMyPackPage>
      </>
    )
  }
}
