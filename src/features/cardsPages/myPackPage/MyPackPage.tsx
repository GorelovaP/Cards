import React, { useEffect, useState } from 'react'

import ClickAwayListener from '@mui/material/ClickAwayListener'
import { useNavigate } from 'react-router-dom'

import {
  getCardsTC,
  setCurrentCardsPageAC,
  setPageCountCardsAC,
  setSortSettingsAC,
} from '../../../app/cards-reducer'
import {
  deletePackTC,
  getFromLocalStorageChosenPackTC,
  setCurrentPageAC,
  setMinMaxAC,
} from '../../../app/pack-reducer'
import { PATH } from '../../../app/routes/PagesRoutes'
import deleteIcon from '../../../assets/images/menu/myPackMenu/Delete.svg'
import edit from '../../../assets/images/menu/myPackMenu/Edit.svg'
import learn from '../../../assets/images/menu/myPackMenu/teacher.svg'
import popUp from '../../../assets/images/PopUp.svg'
import { BackToPack } from '../../../common/components/backToPack/BackToPack'
import { Loading } from '../../../common/components/loading/Loading'
import { MenuItem } from '../../../common/components/menuItem/MenuItem'
import { Paginator } from '../../../common/components/paginator/Paginator'
import { Search } from '../../../common/components/search/Search'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/appHooks'
import { CardsModal } from '../../../common/modals/cardsModal/CardsModal'
import { DeleteModal } from '../../../common/modals/deleteModal/DeleteModal'
import { StyleButtonForMainPageHeader } from '../../../common/styledComponents/styledButtons'
import { H1 } from '../../../common/styledComponents/styledHeaders'
import {
  StyledFeaturesWrapper,
  StyledPageHeaderWrapper,
} from '../../../common/styledComponents/styledWrappers'
import { EditPackNameModal } from '../../packsPage/packsModal/editPackNameModal/EditPackNameModal'
import { EmptyPackPage } from '../emptyPackPage/EmptyPackPage'

import { MyCardsTable } from './myCardsTable/MyCardsTable'
import { StyledMenuItemMyPackContainer, StyledMyPackPage } from './styledMyPackPage'

export const MyPackPage = () => {
  const chosenPack = useAppSelector(state => state.packs.chosenPack)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const currentPage = useAppSelector(state => state.cards.page)
  const searchData = useAppSelector(state => state.cards.searchData)
  const chosenPackName = useAppSelector(state => state.cards.packName)
  const sortSettings = useAppSelector(state => state.cards.sortSettings)
  const isLoading = useAppSelector(state => state.app.isLoading)
  const staticMin = useAppSelector(state => state.packs.minCardsCount)
  const staticMax = useAppSelector(state => state.packs.maxCardsCount)
  const deckCover = useAppSelector(state => state.cards.packDeckCover)
  const firstRender = useAppSelector(state => state.app.firstRender)
  const packPrivate = useAppSelector(state => state.cards.packPrivate)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditPackNameModal, setOpenEditPackNameModal] = useState(false)
  const [openDeletePackModal, setOpenDeletePackModal] = useState(false)

  useEffect(() => {
    dispatch(getFromLocalStorageChosenPackTC())
  }, [])

  useEffect(() => {
    dispatch(getCardsTC())
  }, [sortSettings, currentPage, pageCount, searchData])

  const popUpHandler = () => {
    setShow(!show)
  }
  const handleClickAway = () => {
    setShow(false)
  }
  const setAddModalClose = () => {
    setOpenAddModal(false)
  }
  const setEditPackNameModalClose = () => {
    setOpenEditPackNameModal(false)
  }
  const setDeletePackModalClose = () => {
    setOpenDeletePackModal(false)
  }

  const onClickHandler = () => {
    setOpenAddModal(true)
  }

  const openDeleteMyPackModal = () => {
    setOpenDeletePackModal(true)
    setShow(false)
  }

  const deleteHandler = () => {
    dispatch(deletePackTC(chosenPack, true))
    navigate(PATH.HOME_PAGE)
  }

  const updatePackName = () => {
    setOpenEditPackNameModal(true)
    setShow(false)
  }

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

  const learnMyPack = () => {
    navigate(PATH.LEARN)
  }

  if (firstRender) {
    return <Loading />
  }

  if (cardsTotalCount === 0) {
    return <EmptyPackPage chosenPackName={chosenPackName} />
  } else {
    return (
      <>
        <BackToPack callback={onExit} />
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
                      <MenuItem
                        text={'Delete'}
                        icon={deleteIcon}
                        onClickHandler={openDeleteMyPackModal}
                      />
                      <MenuItem text={'Learn'} icon={learn} onClickHandler={learnMyPack} />
                    </StyledMenuItemMyPackContainer>
                  </ClickAwayListener>
                )}
              </div>
            </div>
            <StyleButtonForMainPageHeader onClick={onClickHandler} disabled={isLoading}>
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
              setCurrentItem={setCurrentItem}
              currentItem={currentPage}
              ChangeFieldsNumber={changeFieldsNumber}
            />
          </>
          {openAddModal && (
            <CardsModal
              open={openAddModal}
              onClose={setAddModalClose}
              initialAnswer={''}
              initialQuestion={''}
              title={'Add new card'}
            />
          )}
          {openEditPackNameModal && (
            <EditPackNameModal
              open={openEditPackNameModal}
              onClose={setEditPackNameModalClose}
              name={chosenPackName}
              private={packPrivate}
              id={chosenPack}
              deckCover={deckCover}
              menu={true}
            />
          )}
          {openDeletePackModal && (
            <DeleteModal
              title={'Delete Pack'}
              open={openDeletePackModal}
              onClose={setDeletePackModalClose}
              onClick={deleteHandler}
              name={chosenPackName}
              deckCover={deckCover}
            />
          )}
        </StyledMyPackPage>
      </>
    )
  }
}
