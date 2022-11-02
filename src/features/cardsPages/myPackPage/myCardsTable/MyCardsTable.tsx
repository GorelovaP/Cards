import { deleteCardTC, updateCardInfoTC } from '../../../../app/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/appHooks'

import { MyCardsTableHeader } from './myCardsTableHeader/MyCardsTableHeader'
import { MyCardsTableItem } from './myCardsTableItem/MyCardsTableItem'
import { StyledMyCardsTable } from './styledMyCardsTable'

export const MyCardsTable = () => {
  let cards = useAppSelector(state => state.cards.cards)

  const dispatch = useAppDispatch()

  const deleteCard = async (cardId: string) => {
    await dispatch(deleteCardTC(cardId))
  }

  const updateCardInfo = (_id: string) => {
    dispatch(updateCardInfoTC({ _id, question: 'updated', answer: 'updated' }))
  }

  return (
    <StyledMyCardsTable>
      <MyCardsTableHeader />
      {cards.map(item => {
        return (
          <MyCardsTableItem
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
    </StyledMyCardsTable>
  )
}
