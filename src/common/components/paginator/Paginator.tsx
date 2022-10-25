import React, { useState } from 'react'

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import { PadinatorSelect } from './select/PaginatorSelect'
import { StyledPaginator } from './styledPaginator'

type PaginatorPropsType = {
  totalItemsCount: number
  pageSize: number
  paginatorPortion: number
  setCurrentItem: (item: number) => void
  currentItem: number
}

export const Paginator = (props: PaginatorPropsType) => {
  let options = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
  let pages = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(props.totalItemsCount / props.paginatorPortion)
  let [portionNumber, setPortionNumber] = useState<number>(1)
  let leftPortionPageNumber = (portionNumber - 1) * props.paginatorPortion + 1
  let rightPortionPageNumber = portionNumber * props.paginatorPortion

  let [leftDisable, setLeftDisable] = useState<boolean>(true)
  let [rightDisable, setRightDisable] = useState<boolean>(false)

  const doLeftBtnDisable = () => {
    if (portionNumber === 2) {
      setPortionNumber(portionNumber - 1)
      setLeftDisable(true)
    }
    if (portionNumber > 1) {
      setPortionNumber(portionNumber - 1)
    } else {
      setLeftDisable(true)
      setRightDisable(false)
    }
  }

  const doRightBtnDisable = () => {
    if (portionNumber == portionCount - 1) {
      setRightDisable(true)
    } else {
      setPortionNumber(portionNumber + 1)
      setLeftDisable(false)
      console.log(portionNumber + 'portionNumber')
      console.log(portionCount)
    }
  }

  const chooseCurrentPage = (page: number) => {
    props.setCurrentItem(page)
  }
  const ChangeFieldsNumber = (choice: string) => {
    console.log(`сейчас поменяли количество жлементоы на странице ${choice}`)
  }

  return (
    <StyledPaginator>
      <button disabled={leftDisable} onClick={doLeftBtnDisable} className={'paginatorBtn'}>
        {leftDisable ? <AiOutlineLeft color={'#EFEFEF'} /> : <AiOutlineLeft color={'#000000'} />}
      </button>

      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return (
            <span
              key={p}
              onClick={() => chooseCurrentPage(p)}
              className={`page ${props.currentItem === p ? 'selectedPage' : ''}`}
            >
              {p}
            </span>
          )
        })}
      <span className={'page'}>...</span>
      <span className={'page'}>{portionCount}</span>
      <button disabled={rightDisable} onClick={doRightBtnDisable} className={'paginatorBtn'}>
        {rightDisable ? <AiOutlineRight color={'#EFEFEF'} /> : <AiOutlineRight color={'#000000'} />}
      </button>
      <span className={'beforeSelect'}>Show</span>
      <PadinatorSelect options={options} onChangeOption={ChangeFieldsNumber} />
      <span>Cards per page</span>
    </StyledPaginator>
  )
}
