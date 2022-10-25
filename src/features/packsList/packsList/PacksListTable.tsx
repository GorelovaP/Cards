import { useAppSelector } from '../../../app/hooks'

import { PacksListTableHeader } from './packsListTableHeader/PacksListTableHeader'
import { PacksListTableItem } from './packsListTableItem/PacksListTableItem'
import { StyledPacksListTable } from './styledPacksListTable'

export const PacksListTable = () => {
  const packs = useAppSelector(state => state.packs.cardPacks)

  return (
    <StyledPacksListTable>
      <PacksListTableHeader />
      {packs.map(item => (
        <PacksListTableItem
          key={item._id}
          name={item.name}
          cards={item.cardsCount}
          lastUpdated={item.updated}
          userName={item.user_name}
        />
      ))}
    </StyledPacksListTable>
  )
}

//
