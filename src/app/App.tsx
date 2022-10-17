import React from 'react'

import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../common/styledComponents/globalStyles'
import { Header } from '../common/styledComponents/Header'
import { theme } from '../common/styledComponents/theme'
import { PersonalInformation } from '../features/personalInformation/personalInformation'

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <PersonalInformation />
      </ThemeProvider>
    </div>
  )
}

export default App
