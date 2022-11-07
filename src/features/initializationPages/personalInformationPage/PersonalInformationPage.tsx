import React, { ChangeEvent, useRef } from 'react'

import { IoMdLogOut } from 'react-icons/io'

import { singOutTC } from '../../../app/app-reducer'
import { setMinMaxAC } from '../../../app/pack-reducer'
import { changeUserNameOrImageTC } from '../../../app/user-reducer'
import avatar from '../../../assets/images/initialization/avatar.png'
import photo from '../../../assets/images/initialization/photo.png'
import { BackToPack } from '../../../common/components/backToPack/BackToPack'
import { convertFileToBase64 } from '../../../common/helpers/convertFileToBase64'
import { errorHandler } from '../../../common/helpers/errorHandler'
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

  const email = useAppSelector(state => state.user.user.email)
  const isLoading = useAppSelector(state => state.app.isLoading)
  const staticMin = useAppSelector(state => state.packs.minCardsCount)
  const staticMax = useAppSelector(state => state.packs.maxCardsCount)
  const userPhoto = useAppSelector(state => state.user.user.avatar)
  const name = useAppSelector(state => state.user.user.name)

  const setUserPhoto = userPhoto ? userPhoto : avatar

  const logOut = () => {
    dispatch(singOutTC())
  }

  const onBackToPack = () => {
    dispatch(setMinMaxAC(staticMin, staticMax))
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 1000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(changeUserNameOrImageTC(name, file64))
        })
      } else {
        const error = new Error('Файл слишком большого размера')

        errorHandler({ error, dispatch })
      }
    }
  }

  return (
    <>
      <BackToPack callback={onBackToPack} />
      <StyledPersonalFormWrapper>
        <StyledPersonalInformationPage>
          <H2>Personal Information</H2>
          <div className={'photo'}>
            <img className={'avatar'} src={setUserPhoto} alt="avatar" />
            <button className={'buttonForPhoto'} onClick={selectFileHandler}>
              <img src={photo} alt="button" />
            </button>
            <input
              style={{ display: 'none' }}
              ref={inputRef}
              type="file"
              onChange={uploadHandler}
              accept="image/png, image/jpeg"
            />
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
