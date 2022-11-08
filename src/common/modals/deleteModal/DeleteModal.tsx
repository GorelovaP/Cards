import React from 'react'

import { useAppSelector } from '../../hooks/appHooks'
import { StyledButton } from '../../styledComponents/styledButtons'
import BasicModal from '../basicModal/BasicModal'

import noCover from './../../../assets/images/table/noCover.jpg'
import { StyledDeleteModal } from './styledDeleteModal'

type PropsType = {
  title: string
  open: boolean
  onClose: () => void
  onClick: () => void
  name: string
  deckCover?: string
  cards?: boolean
}

export const DeleteModal = (props: PropsType) => {
  const isLoading = useAppSelector(state => state.app.isLoading)

  return (
    <BasicModal open={props.open} onClose={props.onClose} title={props.title}>
      <StyledDeleteModal>
        {!props.cards && (
          <img src={props.deckCover ? props.deckCover : noCover} alt="PackDeckCover " />
        )}
        {props.cards && props.deckCover !== ' ' && props.deckCover && (
          <img src={props.deckCover} alt={'Question'} />
        )}
        <p>
          Do you really want to delete{' '}
          <b>
            {props.cards && props.deckCover !== ' ' && props.deckCover ? 'This Card' : props.name}
          </b>
          ?
        </p>
        {!props.cards && <p>All cards will be deleted.</p>}
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
