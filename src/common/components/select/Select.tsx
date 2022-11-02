import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

import { StyledSelect } from './styledSelect'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>
type SuperSelectPropsType = DefaultSelectPropsType & {
  options: string[]
  label: string
}

export const Select = (props: SuperSelectPropsType) => {
  const mappedOptions: JSX.Element[] | undefined = props.options.map((el, key) => {
    return (
      <option key={key} value={el} className={'option'}>
        {el}
      </option>
    )
  })

  return (
    <StyledSelect>
      <label className={'label'}>{props.label}</label>
      <select className={'select'}>{mappedOptions}</select>
    </StyledSelect>
  )
}
