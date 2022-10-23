import React from 'react'

import { StyledSearch } from './styledSearch'

export const Search = () => {
  return (
    <StyledSearch>
      <label className={'label'}>Search</label>
      <input placeholder={'Provide your text'} />
    </StyledSearch>
  )
}
