import React from 'react'

import { StyleButtonForMainPageHeader } from '../../common/styledComponents/styledButtons'
import { H3 } from '../../common/styledComponents/styledHeaders'

import { StyledNewEmptyPackPage } from './styledNewEmptyPackPage'

type EmptyAreaPopsType = {
  addNewCard: () => void
}
export const EmptyArea = (props: EmptyAreaPopsType) => {
  return (
    <StyledNewEmptyPackPage>
      <div className="centerContainer">
        <H3>This pack is empty. Click &lsquo;Add new card&lsquo; to fill this pack.</H3>
        <StyleButtonForMainPageHeader onClick={props.addNewCard}>
          Add new card
        </StyleButtonForMainPageHeader>
      </div>
    </StyledNewEmptyPackPage>
  )
}
