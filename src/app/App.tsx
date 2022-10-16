import React from 'react'

import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../common/styledComponents/globalStyles'
import { theme } from '../common/styledComponents/theme'

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <HashRouter></HashRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
