import SuperButton from "../common/components/button/SuperButton";
import s from "./Test.module.scss"
import SuperCheckbox from "../common/components/checkbox/SuperCheckbox";
import {ChangeEvent, useState} from "react";
import SuperRadio from "../common/components/radio/SuperRadio";
import SuperInputText from "../common/components/input-text/SuperInputText";
import SuperSelect from "../common/components/select/SuperSelect";
import SuperEditableSpan from "../common/components/editableSpan/SuperEditableSpan";
import SuperRange from "../common/components/range/SuperRange";

export const Test = () => {
    //для checkBox
    const [checked, setChecked] = useState<boolean>(false)
    //для Radio
    let arr = ["123", "34", "22", "7"]
    const [value, onChangeOption] = useState(arr[1])
    //для инпута
    const [error, setError] = useState<string>('')
    const setCallback = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.currentTarget.value.trim()

        if (inputValue) {
            setError("")
        } else {
            setError("Name required")
        }
    }
    //для select
    let selectArr = ["1", "ghj", "yry", "q"]
    const [SelectValue, onChangeOptionSelect] = useState(arr[1])
    //для EditableSpan
    let [valueSpan, setValueSpan] = useState<string>("Жмякни")
    //для Range
    let [valueRange, setValueRange] = useState<number>(10)

    return (<div className={s.testPage}>
        <h1>Tестовая страница</h1>
        <div className={s.testPage__buttons}>
            Варианты кнопок
            <SuperButton>Стандартная кнопка</SuperButton>
            <SuperButton active={!!"Я активна(выбрана)"}>Активная кнопка</SuperButton>
            <SuperButton disabled={true}> Нерабочая кнопка</SuperButton>
            <SuperButton red={true}> Кнопка отмены</SuperButton>
            <SuperButton className={s.button_pink}> Кнопка с доп стилем</SuperButton>
        </div>
        <div className={s.testPage__checkbox}>
            <span>СheckBox</span>
            <SuperCheckbox checked={checked} onChange={() => setChecked}> some text</SuperCheckbox>
        </div>
        <div>
            <span>Radio</span>
            <SuperRadio
                name={'radio'}
                options={arr}
                value={value}
                onChangeOption={onChangeOption}
            />
        </div>
        <div className={s.testPage__input}>
            <span>Input text</span>
            <SuperInputText
                placeholder={"Обычный инпут"}/>
            <SuperInputText
                className={s.blue}
                placeholder={"С доп классом стилизации"}/>
            <SuperInputText
                onBlur={setCallback}
                onChange={setCallback}
                placeholder={"C доп + имитация ошибки"}
                error={error}
                className={s.blue} // проверьте, рабоет ли смешивание классов
            />
        </div>
        <div>
            Select
            <SuperSelect
                options={selectArr}
                value={SelectValue}
                onChangeOption={onChangeOptionSelect}
            />
        </div>
        <div>
            Editable Span
            <SuperEditableSpan
                value={valueSpan}
                onChangeText={setValueSpan}
                spanProps={{children: value ? undefined : 'enter text...'}}
            />
        </div>
        <div>
            Range
            <span>{valueRange}</span>
            <SuperRange onChangeRange={setValueRange} value={valueRange}/>
            <span>100</span>
        </div>
    </div>)
}