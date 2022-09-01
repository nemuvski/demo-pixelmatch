import pxm from 'pixelmatch'
import React, { createContext, type FC, type PropsWithChildren, useCallback, useEffect, useState } from 'react'
import type { FileObject } from '~/features/image-diff/models'
import { useFileObject } from '~/features/image-diff/hooks'
import { DispatchFileObjectFn } from '~/features/image-diff/types'
import { createCanvasContext, getBlobByCanvas } from '~/features/image-diff/utils'

export const ImageDiffContext = createContext<{
  fileObject1: FileObject | null
  fileObject2: FileObject | null
  createDiffImage: () => Promise<void>
  diffObjectURL: string | null
}>({
  fileObject1: null,
  fileObject2: null,
  createDiffImage: async () => {
    /* To be implemented */
  },
  diffObjectURL: null,
})

export const DispatchImageDiffContext = createContext<{
  setFileObject1: DispatchFileObjectFn
  setFileObject2: DispatchFileObjectFn
  reset: () => void
}>({
  setFileObject1: () => {
    /* To be implemented */
  },
  setFileObject2: () => {
    /* To be implemented */
  },
  reset: () => {
    /* To be implemented */
  },
})

const ImageDiffProvider: FC<PropsWithChildren> = ({ children }) => {
  const [fileObject1, setFileObject1] = useFileObject()
  const [fileObject2, setFileObject2] = useFileObject()
  const [diffObjectURL, setDiffObjectURL] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (diffObjectURL) {
        URL.revokeObjectURL(diffObjectURL)
      }
    }
  }, [diffObjectURL])

  const createDiffImage = useCallback(async () => {
    if (!fileObject1 || !fileObject2) {
      throw new Error('Two images required.')
    }

    const image1 = await createCanvasContext(fileObject1.objectURL)
    // Fits the size of image1
    const diffSize = image1.size
    const image2 = await createCanvasContext(fileObject2.objectURL, diffSize)

    const diffCanvas = document.createElement('canvas')
    const diffContext = diffCanvas.getContext('2d')
    if (!diffContext) {
      throw new Error('Failed to create a diff CanvasRenderingContext.')
    }
    diffCanvas.width = diffSize.width
    diffCanvas.height = diffSize.height
    const outputDiff = diffContext.createImageData(diffSize.width, diffSize.height)

    const numDiffPixels = pxm(
      image1.context.getImageData(0, 0, diffSize.width, diffSize.height).data,
      image2.context.getImageData(0, 0, diffSize.width, diffSize.height).data,
      outputDiff.data,
      diffSize.width,
      diffSize.height
    )

    console.debug({
      numDiffPixels,
      width: diffSize.width,
      height: diffSize.height,
      diffPercentage: (100 * numDiffPixels) / (diffSize.width * diffSize.height),
    })

    diffContext.putImageData(outputDiff, 0, 0)

    const blob = await getBlobByCanvas(diffCanvas)

    setDiffObjectURL(URL.createObjectURL(blob))
  }, [fileObject1, fileObject2])

  return (
    <ImageDiffContext.Provider
      value={{
        fileObject1,
        fileObject2,
        createDiffImage,
        diffObjectURL,
      }}
    >
      <DispatchImageDiffContext.Provider
        value={{
          setFileObject1,
          setFileObject2,
          reset: () => {
            setFileObject1(null)
            setFileObject2(null)
            if (diffObjectURL) {
              URL.revokeObjectURL(diffObjectURL)
              setDiffObjectURL(null)
            }
          },
        }}
      >
        {children}
      </DispatchImageDiffContext.Provider>
    </ImageDiffContext.Provider>
  )
}

export default ImageDiffProvider
