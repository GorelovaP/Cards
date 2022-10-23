import React from 'react'

import { BiSearch } from 'react-icons/bi'

import { StyledLabel } from '../../styledComponents/styledLabel'

import { StyledSearch } from './styledSearch'

type propsType = {
  className?: string
}
export const Search = (props: propsType) => {
  return (
    <StyledSearch className={props.className}>
      <StyledLabel>Search</StyledLabel>
      <BiSearch className={'searchIcon'} />
      <input placeholder={'Provide your text'} />
    </StyledSearch>
  )
}
