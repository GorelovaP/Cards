import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean,
    active?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className, active,
        ...restProps
    }
) => {
    const finalClassName = `${active ? s.active : ""} ${red ? s.red : ""} ${className ? className + " " + s.default : s.default}`
    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}

export default SuperButton
