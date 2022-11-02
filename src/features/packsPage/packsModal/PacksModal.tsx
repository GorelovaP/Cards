import BasicModal from '../../../common/components/basicModal/BasicModal'

type PropsType = {
  open: boolean
  onClose: () => void
}
export const PacksModal = (props: PropsType) => {
  return (
    <BasicModal open={props.open} onClose={props.onClose} title={'Add new pack'}>
      <p> add </p>
    </BasicModal>
  )
}
