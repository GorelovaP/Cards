import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import s from "./SuperSelect.module.css"

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: string[]
    onChangeOption: (option: string) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChangeOption,
        onChange,
        ...restProps
    }
) => {
    const mappedOptions: JSX.Element[] | undefined = options?.map((el, key) => {
        return <option key={key} value={el}>{el}</option>
    })

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        let choice = e.currentTarget.value
        if (choice) {
            onChangeOption(choice)
        }
        onChange && onChange(e)
    }

    return (
        <select onChange={onChangeCallback} {...restProps} className={s.select}>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
