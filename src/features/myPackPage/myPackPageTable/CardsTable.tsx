import { useAppSelector } from '../../../app/hooks'

import { CardsTableHeader } from './CardsTableHeader/CardsTableHeader'
import { CardsTableItem } from './CardsTableItem/CardsTableItem'
import { StyledCardsTable } from './styledCardsTable'

export const CardsTable = () => {
  let cards = useAppSelector(state => state.cards.cards)

  return (
    <StyledCardsTable>
      <CardsTableHeader />

      {cards.map(item => {
        return (
          <CardsTableItem
            key={item._id}
            question={item.question}
            answer={item.answer}
            lastUpdated={item.updated}
            grade={item.grade}
          />
        )
      })}
    </StyledCardsTable>
  )
}
