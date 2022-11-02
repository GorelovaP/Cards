import React from 'react'

import { deletePackTC } from '../../../../app/pack-reducer'
import BasicModal from '../../../../common/components/basicModal/BasicModal'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/appHooks'
import { StyledButton } from '../../../../common/styledComponents/styledButtons'

import { StyledDeletePackModal } from './styledDeletePackModal'

type PropsType = {
  open: boolean
  onClose: () => void
  packId: string
}

export const DeletePackModal = (props: PropsType) => {
  const isLoading = useAppSelector(state => state.app.isLoading)

  const dispatch = useAppDispatch()

  const deletePack = (packId: string) => {
    packId && dispatch(deletePackTC(packId))
    props.onClose
  }

  return (
    <BasicModal open={props.open} onClose={props.onClose} title={'Delete pack'}>
      <StyledDeletePackModal>
        <p>
          Do you really want to delete <b>Pack Name</b>?
        </p>
        <p>All cards will be deleted.</p>
        <div className={'buttonsContainer'}>
          <StyledButton className={'cancel'} onClick={props.onClose}>
            Cancel
          </StyledButton>
          <StyledButton
            className={'delete'}
            disabled={isLoading}
            onClick={() => deletePack(props.packId)}
          >
            Delete
          </StyledButton>
        </div>
      </StyledDeletePackModal>
    </BasicModal>
  )
}
