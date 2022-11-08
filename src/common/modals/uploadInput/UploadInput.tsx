import React, { ChangeEvent, useRef, useState } from 'react'

import noCover from './../../../assets/images/table/noCover.jpg'
import { StyledCoverWrapper } from './styledCoverWrapper'

type PropsType = {
  getCoverHandler: (cover: string) => void
  imgName: string
  coverPic?: string
}

export const InputTypeFile = (props: PropsType) => {
  const initialCove = props.coverPic === ' ' ? noCover : props.coverPic

  const [cover, setCover] = useState(initialCove || noCover)
  const [isCoverBroken, setIsCoverBroken] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 1000000) {
        convertFileToBase64(file, (file64: string) => {
          setCover(file64)
          props.getCoverHandler(file64)
        })
      } else {
        alert('Please be informed that maximum file size is 1MB')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  const errorHandler = () => {
    setIsCoverBroken(true)
    alert('This picture is broken, please try another one')
  }

  return (
    <StyledCoverWrapper>
      <div className={'coverHeader'}>
        <label>{props.imgName}</label>
        <div>
          <input type="file" ref={inputRef} onChange={uploadHandler} style={{ display: 'none' }} />
          <span onClick={selectFileHandler}>Change cover</span>
        </div>
      </div>
      <img src={isCoverBroken ? noCover : cover} onError={errorHandler} alt="cover" />
    </StyledCoverWrapper>
  )
}
