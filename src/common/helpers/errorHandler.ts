import axios, { AxiosError } from 'axios'

import { SignInResType } from '../../api/appApi'
import { setAppErrorAC } from '../../app/app-reducer'
import { AppDispatch } from '../../app/store'

type PropsType = {
  error: Error | AxiosError<SignInResType>
  dispatch: AppDispatch
}

export const errorHandler = ({ error, dispatch }: PropsType) => {
  if (axios.isAxiosError(error) && error.response?.data.error) {
    dispatch(setAppErrorAC(error.response?.data.error))
  } else {
    dispatch(setAppErrorAC('Something went wrong...'))
  }
}
