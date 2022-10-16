import React from 'react'

import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../common/styledComponents/globalStyles'
import { theme } from '../common/styledComponents/theme'
import { ForgotPasswordPage } from '../features/ForgotPasswortPage'
import { SignUpPage } from '../features/SignUpPage'

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <HashRouter>
          <SignUpPage />
          <ForgotPasswordPage />
        </HashRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
