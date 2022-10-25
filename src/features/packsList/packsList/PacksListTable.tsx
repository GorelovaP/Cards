import { PacksListTableHeader } from './packsListTableHeader/PacksListTableHeader'
import { PacksListTableItem } from './packsListTableItem/PacksListTableItem'
import { StyledPacksListTable } from './styledPacksListTable'

export const PacksListTable = () => {
  return (
    <StyledPacksListTable>
      <PacksListTableHeader />
      <PacksListTableItem />
      <PacksListTableItem />
      <PacksListTableItem />
      <PacksListTableItem />
      <PacksListTableItem />
    </StyledPacksListTable>
  )
}
