import React from 'react'

import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../common/styledComponents/globalStyles'
import { Header } from '../common/styledComponents/Header'
import { StyledMainWrapper } from '../common/styledComponents/styledWrappers'
import { theme } from '../common/styledComponents/theme'
import { ForgotPasswordPage } from '../features/forgotPasswordPage/ForgotPasswortPage'
import { SignUpPage } from '../features/signUpPage/SignUpPage'
import { SignInPage } from '../features/singInPage/SignInPage'

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StyledMainWrapper>
          <Header />
          <Routes>
            <Route index path={'/cards'} element={<div>main</div>} />
            <Route path={'/signup'} element={<SignUpPage />} />
            <Route path={'/signin'} element={<SignInPage />} />
            <Route path={'/forgotpassword'} element={<ForgotPasswordPage />} />
            <Route path={'/*'} element={<div>404</div>} />
          </Routes>
        </StyledMainWrapper>
      </ThemeProvider>
    </div>
  )
}

export default App
