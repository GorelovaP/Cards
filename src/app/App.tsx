import React, { useEffect } from 'react'

import { useMatch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Loading } from '../common/components/loading/Loading'
import { MySnackbar } from '../common/components/snackBarError/MySnackbar'
import { GlobalStyles } from '../common/styledComponents/globalStyles'
import { StyledMainWrapper } from '../common/styledComponents/styledWrappers'
import { theme } from '../common/styledComponents/theme'
import { Header } from '../features/header/Header'
import { PagesRoutes } from '../features/routes/PagesRoutes'

import { initializeAppTC } from './app-reducer'
import { useAppDispatch, useAppSelector } from './hooks/hooks'

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const appError = useAppSelector(state => state.app.appError)
  const match = useMatch('/:routeKey')

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
          {match?.params.routeKey !== '404' && <Header />}
          <PagesRoutes />
        </StyledMainWrapper>
        {appError && <MySnackbar text={appError} color={'rgb(211, 47, 47)'} />}
      </ThemeProvider>
    </div>
  )
}

export default App
