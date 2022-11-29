import { FC, useRef, ChangeEvent } from 'react'
import styled from 'styled-components'

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
      <ButtonUpload
        type="button"
        onClick={onClickHandler}
      >
        {props.label}
      </ButtonUpload>

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

const ButtonUpload = styled.button`
  border: 0;
  background-color: #000;
  color: #fff;
  border-radius: 4px;
  padding: 8px 32px;
  font-size: 24px;
  cursor: pointer;
`