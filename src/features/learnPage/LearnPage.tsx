import { ChangeEvent, useState } from 'react'

import { BackToPack } from '../../common/components/backToPack/BackToPack'
import { StyledButton } from '../../common/styledComponents/styledButtons'
import { H1, H4 } from '../../common/styledComponents/styledHeaders'
import {
  StyledMainWrapper,
  StyledSingFormWrapper,
} from '../../common/styledComponents/styledWrappers'

import { StyledPacksPage } from './styledLearnPage'

export const LearnPage = () => {
  const [show, setShow] = useState(true)
  const rateInfo = ['Did not know', 'Forgot', 'A lot of thought', 'Сonfused', 'Knew the answer']
  const [value, setOnChangeRadio] = useState(rateInfo[0])

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
        <H1 className="headerH1">Learn “Pack Name”</H1>
        <StyledSingFormWrapper className="learnWrapper">
          <div>
            <b>Question: </b>
            How &quot;This&quot; works in JavaScript?
          </div>
          <H4 className="headerH4">
            Количество попыток ответов на вопрос: <b>10</b>
          </H4>

          {show ? (
            <StyledButton className="answerBtn" onClick={showAnswer}>
              Show answer
            </StyledButton>
          ) : (
            <>
              <div className="answer">
                <b>Answer: </b>
                How &quot;This&quot; works in JavaScript?
              </div>
              <form>
                <ul>
                  <div className="headerUl">Rate yourself:</div>
                  {rateInfo.map((el, index) => {
                    return (
                      <li className="element" key={index}>
                        <label>
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
                <StyledButton className="answerBtn">Next</StyledButton>
              </form>
            </>
          )}
        </StyledSingFormWrapper>
      </StyledMainWrapper>
    </StyledPacksPage>
  )
}
