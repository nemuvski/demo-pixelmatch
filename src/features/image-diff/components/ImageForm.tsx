import { styled } from 'goober'
import React from 'react'
import Button from '~/components/Button'
import InputImage from '~/features/image-diff/components/InputImage'
import { useDispatchImageDiffContext, useImageDiffContext } from '~/features/image-diff/hooks'
import { getFileObjectByEvent } from '~/features/image-diff/utils'

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
Form.defaultProps = { onSubmit: (e) => e.preventDefault() }

const ContentSection = styled('div')`
  text-align: center;
`

const Actions = styled('div')`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`

const ImageForm = () => {
  const { fileObject1, fileObject2, createDiffImage, diffObjectURL } = useImageDiffContext()
  const { setFileObject1, setFileObject2, reset } = useDispatchImageDiffContext()

  return (
    <Form
      onReset={() => {
        reset()
      }}
    >
      <ContentSection>
        <InputImage fileObject={fileObject1} onChange={(e) => setFileObject1(getFileObjectByEvent(e))} />
      </ContentSection>

      <ContentSection>
        <InputImage fileObject={fileObject2} onChange={(e) => setFileObject2(getFileObjectByEvent(e))} />
      </ContentSection>

      {diffObjectURL && (
        <ContentSection>
          <img src={diffObjectURL} alt='Diff image' />
        </ContentSection>
      )}

      <Actions>
        <Button type='reset'>Reset</Button>
        <Button
          disabled={!fileObject1 || !fileObject2}
          onClick={() => {
            createDiffImage().catch((error) => {
              console.error(error)
            })
          }}
        >
          Diff
        </Button>
      </Actions>
    </Form>
  )
}

export default ImageForm
