import { ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes } from 'react'

import { StyledPaginatorSelect } from './styledPaginatorSelector'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: number[]
  onChangeOption: (option: number) => void
  selected: number
}

export const PaginatorSelect: React.FC<SuperSelectPropsType> = ({
  options,
  onChangeOption,
  disabled,
  onChange,
  selected,
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
    let choice = +e.currentTarget.value

    if (choice) {
      onChangeOption(choice)
    }
    onChange && onChange(e)
  }

  return (
    <StyledPaginatorSelect>
      <select
        disabled={disabled}
        value={selected}
        onChange={onChangeCallback}
        {...restProps}
        className={'select'}
      >
        {mappedOptions}
      </select>
    </StyledPaginatorSelect>
  )
}
