import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { RootStateType, AppDispatch } from '../../app/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector` - it includes all types
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
