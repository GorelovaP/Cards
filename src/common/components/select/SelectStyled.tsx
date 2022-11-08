import { useState } from 'react'

import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'

import { DropDownContainer } from './selectStyles'

const options = ['Text', 'Image']

type PropsType = {
  callback: (value: string) => void
  initialValue: string
}

export const SelectStyled = (props: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(props.initialValue)

  const onOptionClicked = (value: string) => {
    setSelectedOption(value)
    setIsOpen(false)
    props.callback(value)
  }

  const toggling = () => setIsOpen(!isOpen)

  return (
    <DropDownContainer>
      <label className={'label'}>Choose a question format</label>
      <div className={'dropDownHeader'} onClick={toggling}>
        {selectedOption || options[0]}
        {isOpen ? <AiOutlineDown className={'icon'} /> : <AiOutlineUp className={'icon'} />}
      </div>
      {isOpen && (
        <div>
          <ul className={'dropDownList'}>
            {options.map((option, key) => (
              <li className={'listItem'} onClick={() => onOptionClicked(option)} key={key}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </DropDownContainer>
  )
}
