import React, { useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../common/styledComponents/globalStyles'
import { Header } from '../common/styledComponents/Header'
import { Loading } from '../common/styledComponents/Loading'
import { StyledMainWrapper } from '../common/styledComponents/styledWrappers'
import { theme } from '../common/styledComponents/theme'
import { CheckEmail } from '../features/checkEmail/CheckEmail'
import { CreateNewPassword } from '../features/createNewPassword/CreateNewPassword'
import { ForgotPasswordPage } from '../features/forgotPasswordPage/ForgotPasswortPage'
import { MainPage } from '../features/mainPage/MainPage'
import { PersonalInformation } from '../features/personalInformation/PersonalInformation'
import { SignUpPage } from '../features/signUpPage/SignUpPage'
import { SignInPage } from '../features/singInPage/SignInPage'

import { initializeAppTC } from './app-reducer'
import { useAppDispatch, useAppSelector } from './hooks'

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return <Loading />
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StyledMainWrapper>
          <Header />
          <Routes>
            {/*вместо карточек вначле нужно показывать профиль */}
            <Route path={'/cards'} element={<MainPage />} />
            <Route path={'/signup'} element={<SignUpPage />} />
            <Route path={'/signin'} element={<SignInPage />} />
            <Route path={'/checkemail'} element={<CheckEmail />} />
            <Route path={'/forgotpassword'} element={<ForgotPasswordPage />} />
            <Route path={'/createnewpassword/*'} element={<CreateNewPassword />} />
            <Route path={'/profile'} element={<PersonalInformation />} />
            <Route path={'/*'} element={<div>404</div>} />
          </Routes>
        </StyledMainWrapper>
      </ThemeProvider>
    </div>
  )
}

export default App
