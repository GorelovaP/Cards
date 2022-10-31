import React, { ChangeEvent, memo, useEffect, useState } from 'react'

import { BiSearch } from 'react-icons/bi'
import { useMatch } from 'react-router-dom'

import {  setSearchDataCardsAC } from '../../../app/cards-reducer'
import {  resetFilterAC, setSearchDataAC } from '../../../app/pack-reducer'
import { PATH } from '../../../app/routes/PagesRoutes'
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks'
import { useDebounce } from '../../hooks/commonHooks/useDebounce'
import { StyledLabel } from '../../styledComponents/styledLabel'

import { StyledSearch } from './styledSearch'

type propsType = {
  className?: string
}
export const Search = memo((props: propsType) => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 700)
  let resetFiler = useAppSelector(state => state.packs.resetFilter)
  const dispatch = useAppDispatch()
  const match = useMatch('/:routeKey/*')

  if (resetFiler) {
    setValue('')
    dispatch(resetFilterAC(false))
  }

  useEffect(() => {
    if ('/' + match?.params.routeKey === PATH.HOME_PAGE) {
      dispatch(setSearchDataAC(value))
    } else if (
      '/' + match?.params.routeKey === PATH.MY_PACK ||
      '/' + match?.params.routeKey === PATH.FRIENDS_PACK
    ) {
      dispatch(setSearchDataCardsAC(value))
    }
  }, [debouncedValue])

  const pickValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <StyledSearch className={props.className}>
      <StyledLabel>Search</StyledLabel>
      <BiSearch className={'searchIcon'} />
      <input placeholder={'Provide your text'} type={'search'} onChange={pickValue} value={value} />
    </StyledSearch>
  )
})
