import React from 'react'

import { IoMdLogOut } from 'react-icons/io'

import { singOutTC } from '../../../app/app-reducer'
import { setMinMaxAC } from '../../../app/pack-reducer'
import avatar from '../../../assets/images/initialization/avatar.png'
import { BackToPack } from '../../../common/components/backToPack/BackToPack'
import { errorHandler } from '../../../common/helpers/errorHandler'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/appHooks'
import { LogOutButton } from '../../../common/styledComponents/styledButtons'
import { H2, H4 } from '../../../common/styledComponents/styledHeaders'

import { EditableSpan } from './editableSpan/EditableSpan'
import { InputFile } from './inputFile/InputFile'
import {
  StyledPersonalFormWrapper,
  StyledPersonalInformationPage,
} from './styledPersonalInformationPage'

export const PersonalInformationPage = () => {
  const dispatch = useAppDispatch()

  const email = useAppSelector(state => state.user.user.email)
  const isLoading = useAppSelector(state => state.app.isLoading)
  const staticMin = useAppSelector(state => state.packs.minCardsCount)
  const staticMax = useAppSelector(state => state.packs.maxCardsCount)
  const userPhoto = useAppSelector(state => state.user.user.avatar)

  const setUserPhoto = userPhoto ? userPhoto : avatar

  const logOut = () => {
    dispatch(singOutTC())
  }

  const onBackToPack = () => {
    dispatch(setMinMaxAC(staticMin, staticMax))
  }

  const errorBrokenImage = () => {
    const error = new Error('This picture is broken, please try another one')

    errorHandler({ error, dispatch })
  }

  return (
    <>
      <BackToPack callback={onBackToPack} />
      <StyledPersonalFormWrapper>
        <StyledPersonalInformationPage>
          <H2>Personal Information</H2>
          <div className={'photo'}>
            <img className={'avatar'} src={setUserPhoto} alt="avatar" onError={errorBrokenImage} />
            <InputFile />
          </div>
          <EditableSpan />
          <H4>{email}</H4>
          <LogOutButton className={'logOutBtn'} onClick={logOut} disabled={isLoading}>
            <IoMdLogOut className={'logOutIcon'} />
            Log out
          </LogOutButton>
        </StyledPersonalInformationPage>
      </StyledPersonalFormWrapper>
    </>
  )
}
