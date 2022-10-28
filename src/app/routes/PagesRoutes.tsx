import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { MyPackPage } from '../../features/cardsPages/myPackPage/myPackPage'
import { FriendsPackPage } from '../../features/cardsPages/usersPackPage/FriendsPackPage'
import { CheckEmail } from '../../features/initializationPages/checkEmailPage/CheckEmail'
import { CreateNewPassword } from '../../features/initializationPages/createNewPasswordPage/CreateNewPassword'
import { ForgotPasswordPage } from '../../features/initializationPages/forgotPasswordPage/ForgotPasswortPage'
import { PersonalInformation } from '../../features/initializationPages/personalInformationPage/PersonalInformation'
import { SignUpPage } from '../../features/initializationPages/signUpPage/SignUpPage'
import { SignInPage } from '../../features/initializationPages/singInPage/SignInPage'
import { PacksList } from '../../features/packsPage/PacksList'
import { Page404 } from '../../features/page404/Page404'

export enum PATH {
  PROFILE = '/profile',
  REGISTRATION = '/sign-up',
  LOGIN = '/sign-in',
  CHECK_EMAIL = '/check-email',
  FORGOT_PASSWORD = '/forgot-password',
  CREATE_NEW_PASSWORD = '/create-new-password/:token',
  PAGE_404 = '/404',
  HOME_PAGE = '/packs-list',
  MY_PACK = '/my-pack',
  FRIENDS_PACK = '/friends-pack',
}

export const PagesRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Navigate to={PATH.PROFILE} />} />
        <Route path={PATH.PROFILE} element={<PersonalInformation />} />
        <Route path={PATH.REGISTRATION} element={<SignUpPage />} />
        <Route path={PATH.LOGIN} element={<SignInPage />} />
        <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
        <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={PATH.CREATE_NEW_PASSWORD} element={<CreateNewPassword />} />
        <Route path={PATH.HOME_PAGE} element={<PacksList />} />
        <Route path={PATH.MY_PACK} element={<MyPackPage />} />
        <Route path={PATH.FRIENDS_PACK} element={<FriendsPackPage />} />

        <Route path={PATH.PAGE_404} element={<Page404 />} />
        <Route path={'/*'} element={<Navigate to={PATH.PAGE_404} />} />
      </Routes>
    </>
  )
}
