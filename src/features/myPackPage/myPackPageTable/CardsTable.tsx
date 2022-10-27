import { deleteCardTC, updateCardInfoTC } from '../../../app/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks'

import { CardsTableHeader } from './CardsTableHeader/CardsTableHeader'
import { CardsTableItem } from './CardsTableItem/CardsTableItem'
import { StyledCardsTable } from './styledCardsTable'

export const CardsTable = () => {
  let cards = useAppSelector(state => state.cards.cards)
  const dispatch = useAppDispatch()

  const deleteCard = (cardId: string) => {
    dispatch(deleteCardTC(cardId))
  }
  const updateCardInfo = (_id: string) => {
    dispatch(updateCardInfoTC({ _id, question: 'updated question', answer: 'updated answer' }))
  }

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
            deleteCard={() => deleteCard(item._id)}
            updateCardInfo={() => updateCardInfo(item._id)}
          />
        )
      })}
    </StyledCardsTable>
  )
}
