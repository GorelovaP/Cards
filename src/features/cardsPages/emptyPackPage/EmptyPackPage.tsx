import React, { useState } from 'react'

import { BackToPack } from '../../../common/components/backToPack/BackToPack'
import { useAppSelector } from '../../../common/hooks/appHooks'
import { CardsModal } from '../../../common/modals/cardsModal/CardsModal'
import { StyleButtonForMainPageHeader } from '../../../common/styledComponents/styledButtons'
import { H1, H3 } from '../../../common/styledComponents/styledHeaders'
import { StyledPageHeaderWrapper } from '../../../common/styledComponents/styledWrappers'

import { StyledEmptyPackPage } from './styledEmptyPackPage'

export const EmptyPackPage = (props: PropsType) => {
  const isLoading = useAppSelector(state => state.app.isLoading)

  const [openAddModal, setOpenAddModal] = useState(false)

  const setAddModalClose = () => {
    setOpenAddModal(false)
  }
  const onClickHandler = () => {
    setOpenAddModal(true)
  }

  return (
    <>
      <BackToPack />
      <StyledEmptyPackPage>
        <StyledPageHeaderWrapper>
          <H1>{props.chosenPackName}</H1>
        </StyledPageHeaderWrapper>
        <div className={'centerContainer'}>
          <H3>This pack is empty. Click &lsquo;Add new card&lsquo; to fill this pack.</H3>
          <StyleButtonForMainPageHeader onClick={onClickHandler} disabled={isLoading}>
            Add new card
          </StyleButtonForMainPageHeader>
        </div>
        {openAddModal && (
          <CardsModal
            open={openAddModal}
            onClose={setAddModalClose}
            initialAnswer={''}
            initialQuestion={''}
            title={'Add new card'}
          />
        )}
      </StyledEmptyPackPage>
    </>
  )
}

type PropsType = {
  chosenPackName: string
}
