import React from 'react'

import { useAppSelector } from '../../hooks/appHooks'
import { StyledButton } from '../../styledComponents/styledButtons'
import BasicModal from '../basicModal/BasicModal'

import { StyledDeleteModal } from './styledDeleteModal'

type PropsType = {
  open: boolean
  onClose: () => void
  onClick: () => void
  name: string
  deckCover?: string
}

export const DeleteModal = (props: PropsType) => {
  const isLoading = useAppSelector(state => state.app.isLoading)

  return (
    <BasicModal open={props.open} onClose={props.onClose} title={'Delete pack'}>
      <StyledDeleteModal>
        <img src={props.deckCover} alt="" />
        <p>
          Do you really want to delete <b>{props.name}</b>?
        </p>
        <p>All cards will be deleted.</p>
        <div className={'buttonsContainer'}>
          <StyledButton className={'cancel'} onClick={props.onClose}>
            Cancel
          </StyledButton>
          <StyledButton className={'delete'} disabled={isLoading} onClick={() => props.onClick()}>
            Delete
          </StyledButton>
        </div>
      </StyledDeleteModal>
    </BasicModal>
  )
}
