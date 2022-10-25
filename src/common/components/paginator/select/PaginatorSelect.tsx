import { ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes } from 'react'

import { AiOutlineDown } from 'react-icons/ai'

import { StyledPaginatorSelect } from './styledPaginatorSelector'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: string[]
  onChangeOption: (option: string) => void
}

export const PadinatorSelect: React.FC<SuperSelectPropsType> = ({
  options,
  onChangeOption,
  onChange,
  ...restProps
}) => {
  const mappedOptions: JSX.Element[] | undefined = options?.map((el, key) => {
    return (
      <option key={key} value={el}>
        {el}
      </option>
    )
  })

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    let choice = e.currentTarget.value

    if (choice) {
      onChangeOption(choice)
    }
    onChange && onChange(e)
  }

  return (
    <StyledPaginatorSelect>
      <select onChange={onChangeCallback} {...restProps} className={'select'}>
        {mappedOptions}
        <AiOutlineDown />
      </select>
    </StyledPaginatorSelect>
  )
}
