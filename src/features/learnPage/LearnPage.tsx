import React, { ChangeEvent, useEffect, useState } from 'react'

import { CardsType } from '../../api/cardsApi'
import { getCardsTC, setGradesTC } from '../../app/cards-reducer'
import { setMinMaxAC } from '../../app/pack-reducer'
import { BackToPack } from '../../common/components/backToPack/BackToPack'
import { Loading } from '../../common/components/loading/Loading'
import { useAppDispatch, useAppSelector } from '../../common/hooks/appHooks'
import { StyledButton } from '../../common/styledComponents/styledButtons'
import { H1, H4 } from '../../common/styledComponents/styledHeaders'
import {
  StyledMainWrapper,
  StyledSingFormWrapper,
} from '../../common/styledComponents/styledWrappers'

import { StyledPacksPage } from './styledLearnPage'

type RateInfoType = {
  value: string
  rating: number
}

const rateInfo: RateInfoType[] = [
  { value: 'Did not know', rating: 1 },
  { value: 'Forgot', rating: 2 },
  { value: 'A lot of thought', rating: 3 },
  { value: 'Confused', rating: 4 },
  { value: 'Knew the answer', rating: 5 },
]

const getCard = (cards: CardsType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return cards[res.id + 1]
}

export const LearnPage = () => {
  const packName = useAppSelector(state => state.cards.packName)
  const cards = useAppSelector(state => state.cards.cards)
  const packId = useAppSelector(state => state.packs.chosenPack)
  const staticMin = useAppSelector(state => state.packs.minCardsCount)
  const staticMax = useAppSelector(state => state.packs.maxCardsCount)
  const firstRender = useAppSelector(state => state.app.firstRender)

  const dispatch = useAppDispatch()
  const [show, setShow] = useState<boolean>(true)
  const [first, setFirst] = useState<boolean>(true)

  const [value, setOnChangeRadio] = useState(rateInfo[0].value)
  const [grades, setGrades] = useState(1)

  const [card, setCard] = useState<CardsType>({
    _id: 'fake',
    cardsPack_id: '',

    answer: 'answer fake',
    question: 'question fake',
    grade: 0,
    shots: 0,

    type: '',
    rating: 0,
    more_id: '',

    created: '',
    updated: '',
    comments: '',
    user_id: '',
    __v: 0,
  })

  useEffect(() => {
    if (first) {
      dispatch(getCardsTC())
      setFirst(false)
    }

    if (cards.length > 0) setCard(getCard(cards))

    return () => {}
  }, [dispatch, packId, cards, first])

  const onNext = () => {
    setShow(true)

    dispatch(setGradesTC(grades, card._id))
    setCard(getCard(cards))
  }

  const onBackToPack = () => {
    dispatch(setMinMaxAC(staticMin, staticMax))
  }

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>, element: RateInfoType) => {
    setOnChangeRadio(e.currentTarget.value)
    setGrades(element.rating)
  }

  const showAnswer = () => {
    setShow(false)
  }

  if (firstRender) {
    return <Loading />
  }

  return (
    <StyledPacksPage>
      <StyledMainWrapper>
        <BackToPack callback={onBackToPack} />
        <H1 className="headerH1">{`Learn ${packName}`}</H1>
        <StyledSingFormWrapper className="learnWrapper">
          <div>
            <b>Question: </b>
            {card.question}
          </div>
          <H4 className="headerH4">
            Number of attempts to answer the question: <b>{card.shots + 1}</b>
          </H4>

          {show ? (
            <StyledButton className="answerBtn" onClick={showAnswer}>
              Show answer
            </StyledButton>
          ) : (
            <>
              <div className="answer">
                <b>Answer: </b>
                {card.answer}
              </div>
              <form>
                <ul>
                  <div className="headerUl">Rate yourself:</div>
                  {rateInfo.map((el, index) => {
                    return (
                      <li className="element" key={index}>
                        <label className={`label ${el.value === value ? 'checked' : ''}`}>
                          <input
                            type="radio"
                            value={el.value}
                            checked={el.value === value}
                            onChange={e => {
                              onRadioChange(e, el)
                            }}
                          />
                          <span>{el.value}</span>
                        </label>
                      </li>
                    )
                  })}
                </ul>
                <StyledButton className="nextBtn" onClick={onNext} type={'button'}>
                  Next
                </StyledButton>
              </form>
            </>
          )}
        </StyledSingFormWrapper>
      </StyledMainWrapper>
    </StyledPacksPage>
  )
}
