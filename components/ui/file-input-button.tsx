import { FC, useRef, ChangeEvent } from 'react'

export interface IProps {
  acceptedFileTypes?: string
  allowMultipleFiles?: boolean
  label: string
  onChange: (formData: FormData) => void
  uploadFileName: string
}

export const UIFileInputButton: FC<IProps> = (props) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onClickHandler = () => {
    fileInputRef.current?.click()
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return

    const formData = new FormData()
    formData.append('file', event.target.files[0])

    props.onChange(formData)
    formRef.current?.reset()
  }

  return (
    <form ref={formRef}>
      <button type="button" onClick={onClickHandler}>
        {props.label}
      </button>

      <input
        accept={props.acceptedFileTypes}
        multiple={props.allowMultipleFiles}
        name={props.uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
      />
    </form>
  )
}

UIFileInputButton.defaultProps = {
  acceptedFileTypes: 'image/png, image/jpeg',
  allowMultipleFiles: false
}