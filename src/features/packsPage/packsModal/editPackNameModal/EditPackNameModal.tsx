import React from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { updatePackNameTC } from '../../../../app/pack-reducer'
import { MyCheckBox } from '../../../../common/components/styledChackBox/MyCheckBox'
import { MyInput } from '../../../../common/components/styledInput/MyInput'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/appHooks'
import BasicModal from '../../../../common/modals/basicModal/BasicModal'
import { StyledButton } from '../../../../common/styledComponents/styledButtons'
import { StyledErrorArea } from '../../../../common/styledComponents/styledErrorArea'

import { StyledEditPackNameModal } from './styledEditPackNameModal'

type PropsType = {
  open: boolean
  onClose: () => void
  name: string
  id: string
  menu?: boolean
}

export const EditPackNameModal = (props: PropsType) => {
  const isLoading = useAppSelector(state => state.app.isLoading)

  const dispatch = useAppDispatch()

  const formik = useFormik({
    validationSchema: Yup.object({
      namePack: Yup.string().min(1).max(30).required('* field is required'),
    }),
    initialValues: {
      namePack: props.name,
      privatePack: false,
    },
    onSubmit: values => {
      const { namePack, privatePack } = values

      dispatch(
        updatePackNameTC({ _id: props.id, name: namePack, private: privatePack }, props.menu)
      )
      props.onClose()
    },
  })

  return (
    <BasicModal open={props.open} onClose={props.onClose} title={'Edit pack'}>
      <StyledEditPackNameModal>
        <form onSubmit={formik.handleSubmit}>
          <div className={'inputErrorHandlerForm'}>
            <MyInput
              text={'text'}
              label={'Name Pack'}
              maxLength={30}
              {...formik.getFieldProps('namePack')}
            />
            <div className={'formErrorPlacement'}>
              {formik.errors.namePack && formik.touched.namePack ? (
                <StyledErrorArea>{formik.errors.namePack}</StyledErrorArea>
              ) : null}
              {formik.values.namePack.length === 30 ? (
                <StyledErrorArea>{'max length is 30 symbols'}</StyledErrorArea>
              ) : null}
            </div>
            <div className={'myCheckBox'}>
              <MyCheckBox
                labelValue="Private pack"
                {...formik.getFieldProps('privatePack')}
                checked={formik.values.privatePack}
              />
            </div>
          </div>
          <div className={'buttonsContainer'}>
            <StyledButton className={'cancel'} onClick={props.onClose}>
              Cancel
            </StyledButton>
            <StyledButton className={'save'} type="submit" disabled={isLoading}>
              Save
            </StyledButton>
          </div>
        </form>
      </StyledEditPackNameModal>
    </BasicModal>
  )
}
