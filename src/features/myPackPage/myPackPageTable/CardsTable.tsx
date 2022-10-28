import { deleteCardTC, getCardsTC, updateCardInfoTC } from '../../../app/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks'

import { CardsTableHeader } from './CardsTableHeader/CardsTableHeader'
import { CardsTableItem } from './CardsTableItem/CardsTableItem'
import { StyledCardsTable } from './styledCardsTable'

export const CardsTable = () => {
  let cards = useAppSelector(state => state.cards.cards)
  const chosenPack = useAppSelector(state => state.packs.chosenPack)
  const currentItem = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const searchData = useAppSelector(state => state.packs.searchData)
  const sortSettings = useAppSelector(state => state.packs.sort)

  const dispatch = useAppDispatch()

  const deleteCard = async (cardId: string) => {
    await dispatch(deleteCardTC(cardId))

    dispatch(
      getCardsTC(
        undefined,
        searchData,
        chosenPack,
        undefined,
        undefined,
        sortSettings,
        currentItem,
        pageCount
      )
    )
  }
  const updateCardInfo = (_id: string) => {
    dispatch(updateCardInfoTC({ _id, question: 'updated', answer: 'updated' }))
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
