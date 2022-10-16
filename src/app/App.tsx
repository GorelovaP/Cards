import React from 'react'

import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../common/styledComponents/globalStyles'
import { theme } from '../common/styledComponents/theme'
import { SignInPage } from '../features/singInPage/SignInPage'

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <GlobalStyles />
          <SignInPage />
        </HashRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
