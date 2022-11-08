import { ChangeEvent, useRef } from 'react'

import { changeUserNameOrImageTC } from '../../../../app/user-reducer'
import photo from '../../../../assets/images/initialization/photo.png'
import { errorHandler } from '../../../../common/helpers/errorHandler'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/appHooks'

export const InputFile = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const name = useAppSelector(state => state.user.user.name)

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 1000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(changeUserNameOrImageTC(name, file64))
        })
      } else {
        const error = new Error('Please be informed that maximum file size is 1MB')

        errorHandler({ error, dispatch })
      }
    }
  }

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <>
      <button className={'buttonForPhoto'} onClick={selectFileHandler}>
        <img src={photo} alt="button" />
      </button>
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        onChange={uploadHandler}
        accept="image/png, image/jpeg"
      />
    </>
  )
}
