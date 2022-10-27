import React, { ChangeEvent, memo, useEffect, useState } from 'react'

import { BiSearch } from 'react-icons/bi'
import { useMatch } from 'react-router-dom'

import { getCardsTC } from '../../../app/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks'
import { useDebounce } from '../../../app/hooks/useDeboubce/useDebounce'
import { getPackTC, resetFilterAC, setSearchDataAC } from '../../../app/pack-reducer'
import { PATH } from '../../../features/routes/PagesRoutes'
import { StyledLabel } from '../../styledComponents/styledLabel'

import { StyledSearch } from './styledSearch'

type propsType = {
  className?: string
}
export const Search = memo((props: propsType) => {
  const [value, setValue] = useState<string | undefined>(undefined)
  const debouncedValue = useDebounce<string | undefined>(value, 500)
  let min = useAppSelector(state => state.packs.minCardsCount)
  let max = useAppSelector(state => state.packs.maxCardsCount)
  const chosenPack = useAppSelector(state => state.packs.chosenPack)
  let pageCount = useAppSelector(state => state.packs.pageCount)
  let resetFiler = useAppSelector(state => state.packs.resetFilter)
  const dispatch = useAppDispatch()
  const match = useMatch('/:routeKey/*')

  if (resetFiler) {
    setValue(undefined)
    dispatch(resetFilterAC(false))
  }

  useEffect(() => {
    if (debouncedValue !== undefined && '/' + match?.params.routeKey === PATH.HOME_PAGE) {
      dispatch(getPackTC(value, min, max, undefined, undefined, pageCount, undefined, undefined))
      dispatch(setSearchDataAC(value))
    }
    if (
      (debouncedValue !== undefined && '/' + match?.params.routeKey === PATH.MY_PACK) ||
      (debouncedValue !== undefined && '/' + match?.params.routeKey === PATH.FRIENDS_PACK)
    ) {
      dispatch(getCardsTC(undefined, value, chosenPack, min, max, undefined, undefined, pageCount))
      dispatch(setSearchDataAC(value))
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
