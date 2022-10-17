import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../common/styledComponents/globalStyles'
import { StyledMainWrapper } from '../common/styledComponents/styledWrappers'
import { theme } from '../common/styledComponents/theme'
import { SignUpPage } from '../features/signUpPage/SignUpPage'
import { SignInPage } from '../features/singInPage/SignInPage'

function App() {
  // it's for me...please don't delete
  const shouldRedirect = false

  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StyledMainWrapper>
          <Routes>
            <Route index path={'/cards'} element={<div>main</div>} />
            <Route
              path={'signup'}
              element={shouldRedirect ? <Navigate replace to="signin" /> : <SignUpPage />}
            />
            <Route path={'signin'} element={<SignInPage />} />
            <Route path={'/*'} element={<div>404</div>} />
          </Routes>
        </StyledMainWrapper>
      </ThemeProvider>
    </div>
  )
}

export default App
