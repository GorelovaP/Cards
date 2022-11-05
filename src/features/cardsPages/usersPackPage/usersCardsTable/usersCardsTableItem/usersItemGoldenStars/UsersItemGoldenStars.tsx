import * as React from 'react'

import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'

import { StyledUsersItemGoldenStars } from './styledUsersItemGoldenStars'

type FriendsItemGoldenStarsPropsType = {
  grade: number
}
export const UsersItemGoldenStars = (props: FriendsItemGoldenStarsPropsType) => {
  console.log(props.grade)

  return (
    <StyledUsersItemGoldenStars>
      <Stack spacing={1}>
        <Rating name="half-rating-read" defaultValue={props.grade} precision={0.1} readOnly />
      </Stack>
    </StyledUsersItemGoldenStars>
  )
}
