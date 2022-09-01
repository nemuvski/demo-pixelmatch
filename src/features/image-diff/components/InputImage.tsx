import { styled } from 'goober'
import React, { type ChangeEvent, type FC } from 'react'
import type { FileObject } from '~/features/image-diff/models'

const Wrapper = styled('label')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  border: 0.2rem dashed var(--color-gray-1);
  background-color: var(--color-gray-0);
  color: var(--color-gray-2);
  outline: none;

  > input[type='file'] {
    display: none;
  }
`

type Props = {
  fileObject?: FileObject | null
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputImage: FC<Props> = ({ fileObject, onChange }) => {
  if (fileObject) {
    return <img src={fileObject.objectURL} alt={fileObject.file.name} crossOrigin='anonymous' />
  }

  return (
    <Wrapper>
      <input type='file' accept='image/png' onChange={onChange} />
      <p>Click to select a PNG file.</p>
    </Wrapper>
  )
}

export default InputImage
