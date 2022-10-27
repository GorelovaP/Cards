import React, { ChangeEvent, useEffect, useState } from 'react'

import { BiSearch } from 'react-icons/bi'
import { useMatch } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks'
import { useDebounce } from '../../../app/hooks/useDeboubce/useDebounce'
import { getPackTC } from '../../../app/pack-reducer'
import { PATH } from '../../../features/routes/PagesRoutes'
import { StyledLabel } from '../../styledComponents/styledLabel'

import { StyledSearch } from './styledSearch'

type propsType = {
  className?: string
}
export const Search = (props: propsType) => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)
  let min = useAppSelector(state => state.packs.minCardsCount)
  let max = useAppSelector(state => state.packs.maxCardsCount)
  let pageCount = useAppSelector(state => state.packs.pageCount)
  const dispatch = useAppDispatch()
  const match = useMatch('/:routeKey/*')

  useEffect(() => {
    if (debouncedValue !== '' && '/' + match?.params.routeKey === PATH.HOME_PAGE) {
      dispatch(getPackTC(value, min, max, undefined, undefined, pageCount, undefined, undefined))
    }
    if (
      '/' + match?.params.routeKey === PATH.MY_PACK ||
      '/' + match?.params.routeKey === PATH.FRIENDS_PACK
    ) {
      // here should be other dispatch
      //dispatch(getPackTC(value, min, max, undefined, undefined, pageCount, undefined, undefined))
    }
  }, [debouncedValue])

  const pickValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <StyledSearch className={props.className}>
      <StyledLabel>Search</StyledLabel>
      <BiSearch className={'searchIcon'} />
      <input placeholder={'Provide your text'} type={'search'} onChange={pickValue} />
    </StyledSearch>
  )
}
