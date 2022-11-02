import * as React from 'react'

import Modal from '@mui/material/Modal'
import { GrClose } from 'react-icons/gr'

import { ModalH3 } from '../../styledComponents/styledHeaders'

import { StyledModalWrapper } from './styledBasicModal'

type PropsType = {
  children: React.ReactNode
  title: string
  onClose: () => void
  open: boolean
}

export default function BasicModal(props: PropsType) {
  const handleClose = () => {
    props.onClose()
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModalWrapper>
          <div className="headerContainer">
            <ModalH3>{props.title}</ModalH3>
            <GrClose className="closeIcon" onClick={handleClose} />
          </div>
          <div className="mainContainer">{props.children}</div>
        </StyledModalWrapper>
      </Modal>
    </div>
  )
}
