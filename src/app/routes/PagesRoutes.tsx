import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { MyPackPage } from '../../features/cardsPages/myPackPage/MyPackPage'
import { UsersPackPage } from '../../features/cardsPages/usersPackPage/UsersPackPage'
import { CheckEmailPage } from '../../features/initializationPages/checkEmailPage/CheckEmailPage'
import { CreateNewPasswordPage } from '../../features/initializationPages/createNewPasswordPage/CreateNewPasswordPage'
import { ForgotPasswordPage } from '../../features/initializationPages/forgotPasswordPage/ForgotPasswortPage'
import { PersonalInformationPage } from '../../features/initializationPages/personalInformationPage/PersonalInformationPage'
import { SignUpPage } from '../../features/initializationPages/signUpPage/SignUpPage'
import { SignInPage } from '../../features/initializationPages/singInPage/SignInPage'
import { LearnPage } from '../../features/learnPage/LearnPage'
import { PacksPage } from '../../features/packsPage/PacksPage'
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
  LEARN = '/learn',
}

export const PagesRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />
        <Route path={PATH.PROFILE} element={<PersonalInformationPage />} />
        <Route path={PATH.REGISTRATION} element={<SignUpPage />} />
        <Route path={PATH.LOGIN} element={<SignInPage />} />
        <Route path={PATH.CHECK_EMAIL} element={<CheckEmailPage />} />
        <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={PATH.CREATE_NEW_PASSWORD} element={<CreateNewPasswordPage />} />
        <Route path={PATH.HOME_PAGE} element={<PacksPage />} />
        <Route path={PATH.MY_PACK} element={<MyPackPage />} />
        <Route path={PATH.FRIENDS_PACK} element={<UsersPackPage />} />
        <Route path={PATH.LEARN} element={<LearnPage />} />
        <Route path={PATH.PAGE_404} element={<Page404 />} />
        <Route path={'/*'} element={<Navigate to={PATH.PAGE_404} />} />
      </Routes>
    </>
  )
}
