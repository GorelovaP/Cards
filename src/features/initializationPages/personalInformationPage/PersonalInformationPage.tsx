import React from 'react'

import { IoMdLogOut } from 'react-icons/io'
import { Navigate } from 'react-router-dom'

import { singOutTC } from '../../../app/app-reducer'
import { setMinMaxAC } from '../../../app/pack-reducer'
import { PATH } from '../../../app/routes/PagesRoutes'
import avatar from '../../../assets/images/initialization/avatar.png'
import photo from '../../../assets/images/initialization/photo.png'
import { BackToPack } from '../../../common/components/backToPack/BackToPack'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/appHooks'
import { LogOutButton } from '../../../common/styledComponents/styledButtons'
import { H2, H4 } from '../../../common/styledComponents/styledHeaders'

import { EditableSpan } from './editableSpan/EditableSpan'
import {
  StyledPersonalFormWrapper,
  StyledPersonalInformationPage,
} from './styledPersonalInformationPage'

export const PersonalInformationPage = () => {
  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
  const email = useAppSelector(state => state.user.user.email)
  const isLoading = useAppSelector(state => state.app.isLoading)
  const staticMin = useAppSelector(state => state.packs.minCardsCount)
  const staticMax = useAppSelector(state => state.packs.maxCardsCount)

  const logOut = () => {
    dispatch(singOutTC())
  }

  const onBackToPack = () => {
    dispatch(setMinMaxAC(staticMin, staticMax))
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <>
      <BackToPack callback={onBackToPack} />
      <StyledPersonalFormWrapper>
        <StyledPersonalInformationPage>
          <H2>Personal Information</H2>
          <div className={'photo'}>
            <img className={'avatar'} src={avatar} alt="avatar" />
            <button className={'buttonForPhoto'}>
              <img src={photo} alt="button" />
            </button>
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
