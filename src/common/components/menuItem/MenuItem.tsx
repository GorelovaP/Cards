import { StyledMenuItem } from './styledMenuItem'

export const MenuItem = ({ text, icon, onClickHandler }: MenuItemPropsType) => {
  return (
    <>
      <StyledMenuItem>
        <img src={icon} alt="" />
        <span onClick={onClickHandler}>{text}</span>
      </StyledMenuItem>
    </>
  )
}

type MenuItemPropsType = {
  text: string
  icon: string
  onClickHandler: () => void
}
