import { CardsTableHeader } from './CardsTableHeader/CardsTableHeader'
import { CardsTableItem } from './CardsTableItem/CardsTableItem'
import { StyledCardsTable } from './styledCardsTable'

export const CardsTable = () => {
  return (
    <StyledCardsTable>
      <CardsTableHeader />
      <CardsTableItem />
      <CardsTableItem />
      <CardsTableItem />
      <CardsTableItem />
      <CardsTableItem />
      <CardsTableItem />
      <CardsTableItem />
    </StyledCardsTable>
  )
}
