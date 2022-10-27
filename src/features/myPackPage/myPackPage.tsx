import React, { useEffect, useState } from 'react'

import { ClickAwayListener } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { addNewCardTC, getCardsTC, setCurrentFriendsPageAC } from '../../app/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { deletePackTC, updatePackNameTC } from '../../app/pack-reducer'
import deleteIcon from '../../assets/images/menu/myPackMenu/Delete.svg'
import edit from '../../assets/images/menu/myPackMenu/Edit.svg'
import learn from '../../assets/images/menu/myPackMenu/teacher.svg'
import { BackToPack } from '../../common/components/backToPack/BackToPack'
import { MenuItem } from '../../common/components/menuItem/MenuItem'
import { Paginator } from '../../common/components/paginator/Paginator'
import { Search } from '../../common/components/search/Search'
import { StyleButtonForMainPageHeader } from '../../common/styledComponents/styledButtons'
import { H1 } from '../../common/styledComponents/styledHeaders'
import {
  StyledFeaturesWrapper,
  StyledPageHeaderWrapper,
} from '../../common/styledComponents/styledWrappers'
import { EmptyArea } from '../newEmptyPacKPage/EmptyArea'
import { PATH } from '../routes/PagesRoutes'

import popUp from './../../assets/images/popUp.svg'
import { CardsTable } from './myPackPageTable/CardsTable'
import { StyledMenuItemMyPackContainer, StyledMyPackPage } from './styledMyPackPage'

export const MyPackPage = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  const dispatch = useAppDispatch()
  const chosenPack = useAppSelector(state => state.packs.chosenPack)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const paginatorPortion = 5
  const currentItem = useAppSelector(state => state.cards.page)

  const [show, setShow] = useState(false)

  useEffect(() => {
    dispatch(getCardsTC(undefined, undefined, chosenPack))
  }, [])

  const popUpHandler = () => {
    setShow(!show)
  }
  const handleClickAway = () => {
    setShow(false)
  }

  const addNewCard = () => {
    dispatch(addNewCardTC({ cardsPack_id: chosenPack, question: 'question1', answer: 'answer1' }))
  }

  const deleteMyPack = () => {
    dispatch(deletePackTC(chosenPack))
    setShow(false)
  }

  const updatePackName = () => {
    dispatch(updatePackNameTC({ _id: chosenPack, name: 'new pack title menu' }))
    setShow(false)
  }

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

  return (
    <>
      <BackToPack />
      <StyledMyPackPage>
        <StyledPageHeaderWrapper>
          <div className={'menuPosition'}>
            <H1>My Pack</H1>
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

          {cardsTotalCount !== 0 && (
            <StyleButtonForMainPageHeader onClick={addNewCard}>
              Add new card
            </StyleButtonForMainPageHeader>
          )}
        </StyledPageHeaderWrapper>

        {cardsTotalCount !== 0 ? (
          <>
            <StyledFeaturesWrapper>
              <Search className="mainPageSearch" />
            </StyledFeaturesWrapper>
            <CardsTable />
            <Paginator
              totalItemsCount={cardsTotalCount}
              pageCount={pageCount}
              paginatorPortion={paginatorPortion}
              setCurrentItem={setCurrentItem}
              currentItem={currentItem}
              ChangeFieldsNumber={ChangeFieldsNumber}
            />
          </>
        ) : (
          <EmptyArea addNewCard={addNewCard} />
        )}
      </StyledMyPackPage>
    </>
  )
}
