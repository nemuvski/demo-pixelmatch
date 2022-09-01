import { styled } from 'goober'
import React from 'react'
import ImageFileProvider from '~/features/image-diff/components/ImageDiffProvider'
import ImageForm from '~/features/image-diff/components/ImageForm'

const PoweredBy = styled('p')`
  margin-top: 1.5rem;
  font-size: 0.8rem;
  text-align: end;
`

const ImageDiffMain = () => {
  return (
    <ImageFileProvider>
      <ImageForm />
      <PoweredBy>
        {'Diff by '}
        <a href='https://www.npmjs.com/package/pixelmatch' target='_blank' rel='noopener noreferrer'>
          pixelmatch
        </a>
      </PoweredBy>
    </ImageFileProvider>
  )
}

export default ImageDiffMain
