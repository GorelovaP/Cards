import { useNavigate } from 'react-router-dom'

import { chosenPackAC, deletePackTC, getPackTC, updatePackNameTC } from '../../../app/pack-reducer'
import { PATH } from '../../../app/routes/PagesRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/appHooks'

import { PacksTableHeader } from './packsTableHeader/PacksTableHeader'
import { PacksTableItem } from './packsTableItem/PacksTableItem'
import { StyledPacksTable } from './styledPacksTable'

export const PacksTable = () => {
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

  const deleteMyPack = async (packId: string) => {
    await dispatch(deletePackTC(packId))
    dispatch(getPackTC())
  }

  const updatePackName = (packId: string) => {
    dispatch(updatePackNameTC({ _id: packId, name: 'new pack title' }))
  }

  return (
    <StyledPacksTable>
      <PacksTableHeader />
      {packs.map(item => (
        <PacksTableItem
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
    </StyledPacksTable>
  )
}

//
