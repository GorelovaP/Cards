import React from 'react'

import Skeleton from '@mui/material/Skeleton'

import { useAppSelector } from '../../../../../common/hooks/appHooks'

import { StyledUsersCardsTableItem } from './styledUsersCardsTableItem'
import { UsersItemGoldenStars } from './usersItemGoldenStars/UsersItemGoldenStars'

type FriendsCardsTableItemPropsType = {
  question: string
  answer: string
  lastUpdated: string
  grade: number
  questionImg?: string
  answerImg?: string
}

export const UsersCardsTableItem = (props: FriendsCardsTableItemPropsType) => {
  const date = props.lastUpdated.toString().substring(0, 10).split('-').reverse().join('.')
  const isLoading = useAppSelector(state => state.app.isLoading)

  return (
    <StyledUsersCardsTableItem>
      <div className={'question'}>
        {' '}
        {!isLoading ? (
          <div className={'nameText'}>
            {props.questionImg && props.questionImg !== ' ' ? (
              <img className={'image'} src={props.questionImg} alt={'question'} />
            ) : (
              props.question
            )}
          </div>
        ) : (
          <Skeleton variant="rounded" height={16} width={'100%'} />
        )}
      </div>
      <div className={'answer'}>
        {!isLoading ? (
          <div className={'nameText'}>
            {props.answerImg && props.answerImg !== ' ' ? (
              <img className={'image'} src={props.answerImg} alt={'answer'} />
            ) : (
              props.answer
            )}
          </div>
        ) : (
          <Skeleton variant="rounded" height={16} width={'100%'} />
        )}
      </div>
      <div className={'lastUpdated'}>
        {!isLoading ? date : <Skeleton variant="rounded" height={16} width={'90%'} />}
      </div>
      <div className={'grade'}>
        {!isLoading ? (
          <UsersItemGoldenStars grade={props.grade} />
        ) : (
          <Skeleton variant="rounded" height={16} width={'90%'} />
        )}
      </div>
    </StyledUsersCardsTableItem>
  )
}
