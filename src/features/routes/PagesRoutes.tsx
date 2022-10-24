import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { CheckEmail } from '../checkEmail/CheckEmail'
import { CreateNewPassword } from '../createNewPassword/CreateNewPassword'
import { ForgotPasswordPage } from '../forgotPasswordPage/ForgotPasswortPage'
import { FriendsPackPage } from '../friendsPackPage/FriendsPackPage'
import { MyPackPage } from '../myPackPage/myPackPage'
import { NewEmptyPackPage } from '../newEmptyPacKPage/NewEmptyPackPage'
import { PacksList } from '../packsList/PacksList'
import { Page404 } from '../page404/Page404'
import { PersonalInformation } from '../personalInformation/PersonalInformation'
import { SignUpPage } from '../signUpPage/SignUpPage'
import { SignInPage } from '../singInPage/SignInPage'

export enum PATH {
  PROFILE = '/profile',
  REGISTRATION = '/sign-up',
  LOGIN = '/sign-in',
  CHECK_EMAIL = '/check-email',
  FORGOT_PASSWORD = '/forgot-password',
  CREATE_NEW_PASSWORD = '/create-new-password/:token',
  PAGE_404 = '/404',
  HOME_PAGE = '/packs-list',
  NEW_EMPTY_PACK = '/new-empty-pack',
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
        <Route path={PATH.NEW_EMPTY_PACK} element={<NewEmptyPackPage />} />
        <Route path={PATH.MY_PACK} element={<MyPackPage />} />
        <Route path={PATH.FRIENDS_PACK} element={<FriendsPackPage />} />

        <Route path={PATH.PAGE_404} element={<Page404 />} />
        <Route path={'/*'} element={<Navigate to={PATH.PAGE_404} />} />
      </Routes>
    </>
  )
}
