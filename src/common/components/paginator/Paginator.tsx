import React from 'react'

import usePagination from '@mui/material/usePagination'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import { useAppSelector } from '../../hooks/appHooks'

import { PaginatorSelect } from './select/PaginatorSelect'
import { StyledPaginator, List } from './styledPaginator'

type PaginatorPropsType = {
  totalItemsCount: number
  pageCount: number
  paginatorPortion: number
  setCurrentItem: (item: number) => void
  currentItem: number
  ChangeFieldsNumber: (choice: number) => void
}

export const Paginator = (props: PaginatorPropsType) => {
  const isLoading = useAppSelector(state => state.app.isLoading)
  let options = [4, 6, 8, 10, 15, 20]
  let pagesCount = Math.ceil(props.totalItemsCount / props.pageCount)

  if (Number.isNaN(pagesCount)) {
    pagesCount = 0
  }

  const { items } = usePagination({
    count: pagesCount,
  })

  const chooseCurrentPage = (page: number | null) => {
    if (isLoading) {
      debugger

      return
    }
    props.setCurrentItem(page!)
  }

  return (
    <StyledPaginator>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…'
          } else if (type === 'page') {
            children = (
              <button
                type="button"
                className={`page ${props.currentItem === page ? 'selectedPage' : ''}`}
                {...item}
              >
                {page}
              </button>
            )
          } else if (type === 'previous') {
            children = (
              <button type="button" {...item} className={'paginatorBtn'}>
                {item.disabled ? (
                  <AiOutlineLeft color={'#EFEFEF'} {...item} />
                ) : (
                  <AiOutlineLeft color={'#000000'} {...item} />
                )}
              </button>
            )
          } else if (type === 'next') {
            children = (
              <button type="button" {...item} className={'paginatorBtn'}>
                {item.disabled ? (
                  <AiOutlineRight color={'#EFEFEF'} />
                ) : (
                  <AiOutlineRight color={'#000000'} />
                )}
              </button>
            )
          } else {
            children = (
              <button type="button" {...item}>
                {type}
              </button>
            )
          }

          return (
            <li
              onClick={() => {
                chooseCurrentPage(page)
              }}
              key={index}
            >
              {children}
            </li>
          )
        })}
      </List>
      <span className={'beforeSelect'}>Show</span>
      <PaginatorSelect
        selected={props.pageCount}
        options={options}
        onChangeOption={props.ChangeFieldsNumber}
      />
      <span>Cards per page</span>
    </StyledPaginator>
  )
}
