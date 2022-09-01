import type { ChangeEvent } from 'react'
import type { ImageFileType, ImageSize } from '~/features/image-diff/types'

export function getFileObjectByEvent(
  event: ChangeEvent<HTMLInputElement>,
  accepts: Array<ImageFileType> = ['image/png']
) {
  const { files } = event.target
  if (files && files.length > 0 && accepts.includes(files[0].type as ImageFileType)) {
    return files[0]
  }
  return null
}

function createImage(objectURL: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.src = objectURL
    image.setAttribute('crossOrigin', 'anonymous')
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
  })
}

export async function createCanvasContext(objectURL: string, canvasSize?: ImageSize) {
  const img = await createImage(objectURL)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Failed to create a CanvasRenderingContext.')
  }
  const size: ImageSize = {
    width: img.naturalWidth,
    height: img.naturalHeight,
  }
  canvas.width = canvasSize ? canvasSize.width : size.width
  canvas.height = canvasSize ? canvasSize.height : size.height
  context.drawImage(img, 0, 0)
  return { context, size }
}

export async function getBlobByCanvas(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject()
      }
    }, 'image/png')
  })
}
