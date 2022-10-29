import React from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../app/routes/PagesRoutes'
import error from '../../assets/images/error/404.svg'
import { StyledButton } from '../../common/styledComponents/styledButtons'

import { StyledPage404 } from './styledPage404'

export const Page404 = () => {
  let navigate = useNavigate()

  const goToHomePage = () => {
    navigate(PATH.HOME_PAGE)
  }

  return (
    <>
      <StyledPage404>
        <div className={'textBlock'}>
          <h1>Ooops!</h1>
          <div className={'description'}>Sorry! Page not found!</div>
          <StyledButton className={'BackItem'} onClick={goToHomePage}>
            Back to home page
          </StyledButton>
        </div>
        <div>
          <img src={error} alt={'Error 404'} />
        </div>
      </StyledPage404>
    </>
  )
}
