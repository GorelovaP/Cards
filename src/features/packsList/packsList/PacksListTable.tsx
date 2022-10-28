import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks'
import { chosenPackAC, deletePackTC, getPackTC, updatePackNameTC } from '../../../app/pack-reducer'
import { PATH } from '../../routes/PagesRoutes'

import { PacksListTableHeader } from './packsListTableHeader/PacksListTableHeader'
import { PacksListTableItem } from './packsListTableItem/PacksListTableItem'
import { StyledPacksListTable } from './styledPacksListTable'

export const PacksListTable = () => {
  const packs = useAppSelector(state => state.packs.cardPacks)
  const myId = useAppSelector(state => state.user.user._id)
  const meOrAll = useAppSelector(state => state.packs.meOrAll)
  const sortSettings = useAppSelector(state => state.packs.sort)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const currentItem = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
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
    const responce = await dispatch(deletePackTC(packId))

    if (meOrAll === 'all') {
      dispatch(
        getPackTC(
          undefined,
          minCardsCount,
          maxCardsCount,
          sortSettings,
          currentItem,
          pageCount,
          undefined,
          undefined
        )
      )
    } else {
      dispatch(
        getPackTC(
          undefined,
          minCardsCount,
          maxCardsCount,
          sortSettings,
          currentItem,
          pageCount,
          myId,
          undefined
        )
      )
    }
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
