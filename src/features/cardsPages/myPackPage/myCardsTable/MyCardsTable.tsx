import { useAppSelector } from '../../../../common/hooks/appHooks'

import { MyCardsTableHeader } from './myCardsTableHeader/MyCardsTableHeader'
import { MyCardsTableItem } from './myCardsTableItem/MyCardsTableItem'
import { StyledMyCardsTable } from './styledMyCardsTable'

export const MyCardsTable = () => {
  let cards = useAppSelector(state => state.cards.cards)

  return (
    <StyledMyCardsTable>
      <MyCardsTableHeader />
      {cards.map(item => {
        return (
          <MyCardsTableItem
            key={item._id}
            itemId={item._id}
            question={item.question}
            answer={item.answer}
            lastUpdated={item.updated}
            grade={item.grade}
          />
        )
      })}
    </StyledMyCardsTable>
  )
}
