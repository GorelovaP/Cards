import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import s from "./SuperRadio.module.scss";

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChangeOption) {
            onChangeOption(e.currentTarget.value)
            console.log(e.currentTarget.value)
        }
        if (onChange) {
            onChange(e)
        }

    }


    const mappedOptions: JSX.Element[] | undefined[] = options ? options.map((o, i) => (
        <label key={name + '-' + i} className={o === value ? s.checked : s.label}>
            {o}
            <input
                type={'radio'}
                onChange={onChangeCallback}
                checked={o === value}
                value={o}
                name={name}
                className={s.radio}
                // name, checked, value, onChange
            />

        </label>
    )) : []

    debugger
    return (


        <>
            {mappedOptions}
        </>
    )
}

export default SuperRadio
