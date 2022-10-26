import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { chosenPackAC, deletePackTC, updatePackNameTC } from '../../../app/pack-reducer'
import { PATH } from '../../routes/PagesRoutes'

import { PacksListTableHeader } from './packsListTableHeader/PacksListTableHeader'
import { PacksListTableItem } from './packsListTableItem/PacksListTableItem'
import { StyledPacksListTable } from './styledPacksListTable'

export const PacksListTable = () => {
  const packs = useAppSelector(state => state.packs.cardPacks)
  const myId = useAppSelector(state => state.user.user._id)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onClickHandler = (cardsPack_id: string, userId: string) => {
    dispatch(chosenPackAC(cardsPack_id))
    if (myId === userId) {
      navigate(PATH.MY_PACK)
    } else {
      navigate(PATH.FRIENDS_PACK)
    }
  }

  const deleteMyPack = (packId: string) => {
    dispatch(deletePackTC(packId))
  }

  const updatePackName = (packId: string) => {
    dispatch(updatePackNameTC({ _id: packId, name: 'new pack title' }))
  }

  return (
    <StyledPacksListTable>
      <PacksListTableHeader />
      {packs.map(item => (
        <PacksListTableItem
          key={item._id}
          userId={item.user_id}
          cardsPack_id={item._id}
          name={item.name}
          cards={item.cardsCount}
          lastUpdated={item.updated}
          userName={item.user_name}
          onClickHandler={() => onClickHandler(item._id, item.user_id)}
          deleteMyPack={() => deleteMyPack(item._id)}
          updatePackName={() => updatePackName(item._id)}
        />
      ))}
    </StyledPacksListTable>
  )
}

//
