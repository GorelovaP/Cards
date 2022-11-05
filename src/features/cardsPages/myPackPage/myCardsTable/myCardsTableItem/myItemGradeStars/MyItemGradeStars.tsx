import * as React from 'react'

import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'

import { StyledMyItemGradeStars } from './styledMyItemGradeStars'

type ItemGradeStarsPropsType = {
  grade: number
}
export const MyItemGradeStars = (props: ItemGradeStarsPropsType) => {
  return (
    <StyledMyItemGradeStars>
      <Stack spacing={1}>
        <Rating name="half-rating-read" defaultValue={props.grade} precision={0.1} readOnly />
      </Stack>
    </StyledMyItemGradeStars>
  )
}
