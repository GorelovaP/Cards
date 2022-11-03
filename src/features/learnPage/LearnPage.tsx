import { ChangeEvent, useEffect, useState } from 'react'

import { CardsType } from '../../api/cardsApi'
import { getCardsTC } from '../../app/cards-reducer'
import { BackToPack } from '../../common/components/backToPack/BackToPack'
import { useAppDispatch, useAppSelector } from '../../common/hooks/appHooks'
import { StyledButton } from '../../common/styledComponents/styledButtons'
import { H1, H4 } from '../../common/styledComponents/styledHeaders'
import {
  StyledMainWrapper,
  StyledSingFormWrapper,
} from '../../common/styledComponents/styledWrappers'

import { StyledPacksPage } from './styledLearnPage'

const rateInfo = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

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

  console.log('test: ', sum, rand, res)

  return cards[res.id + 1]
}

export const LearnPage = () => {
  const packName = useAppSelector(state => state.cards.packName)
  const cards = useAppSelector(state => state.cards.cards)
  const packId = useAppSelector(state => state.packs.chosenPack)
  const dispatch = useAppDispatch()
  const [show, setShow] = useState<boolean>(true)
  const [first, setFirst] = useState<boolean>(true)

  const [value, setOnChangeRadio] = useState(rateInfo[0])

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
    console.log('LearnContainer useEffect')

    if (first) {
      dispatch(getCardsTC())
      setFirst(false)
    }

    console.log('cards', cards)
    if (cards.length > 0) setCard(getCard(cards))

    return () => {
      console.log('LearnContainer useEffect off')
    }
  }, [dispatch, packId, cards, first])

  const onNext = () => {
    setShow(true)
    // dispatch
    setCard(getCard(cards))
  }

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOnChangeRadio(e.currentTarget.value)
  }

  const showAnswer = () => {
    setShow(false)
  }

  return (
    <StyledPacksPage>
      <StyledMainWrapper>
        <BackToPack />
        <H1 className="headerH1">{`Learn ${packName}`}</H1>
        <StyledSingFormWrapper className="learnWrapper">
          <div>
            <b>Question: </b>
            {card.question}
          </div>
          <H4 className="headerH4">
            Number of attempts to answer the question: <b>10</b>
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
                        <label className={`label ${el === value ? 'checked' : ''}`}>
                          <input
                            type="radio"
                            value={el}
                            checked={el === value}
                            onChange={e => {
                              onRadioChange(e)
                            }}
                          />
                          <span>{el}</span>
                        </label>
                      </li>
                    )
                  })}
                </ul>
                <StyledButton className="nextBtn" onClick={onNext}>
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
