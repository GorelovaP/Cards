import React, { ChangeEvent, useEffect, useState } from 'react'

import { BiSearch } from 'react-icons/bi'
import { useMatch } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { getPackTC } from '../../../app/pack-reducer'
import { PATH } from '../../../features/routes/PagesRoutes'
import { useDebounce } from '../../hooks/useDeboubce/useDebounce'
import { StyledLabel } from '../../styledComponents/styledLabel'

import { StyledSearch } from './styledSearch'

type propsType = {
  className?: string
}
export const Search = (props: propsType) => {
  const [value, setValue] = useState<string | undefined>(undefined)
  const debouncedValue = useDebounce<string | undefined>(value, 500)
  const dispatch = useAppDispatch()
  const match = useMatch('/:routeKey/*')

  useEffect(() => {
    if ('/' + match?.params.routeKey === PATH.HOME_PAGE) {
      dispatch(
        getPackTC(
          value,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        )
      )
    }
    if (
      '/' + match?.params.routeKey === PATH.MY_PACK ||
      '/' + match?.params.routeKey === PATH.FRIENDS_PACK
    ) {
      dispatch(
        getPackTC(
          value,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        )
      )
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
