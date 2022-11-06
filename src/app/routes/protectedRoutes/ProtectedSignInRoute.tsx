import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../../common/hooks/appHooks'
import { PATH } from '../PagesRoutes'

export const ProtectedSignInRoute = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
