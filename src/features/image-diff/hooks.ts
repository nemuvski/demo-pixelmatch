import { useCallback, useContext, useEffect, useState } from 'react'
import type { DispatchFileObjectFn } from '~/features/image-diff/types'
import { DispatchImageDiffContext, ImageDiffContext } from '~/features/image-diff/components/ImageDiffProvider'
import { FileObject } from '~/features/image-diff/models'

export function useFileObject(): [FileObject | null, DispatchFileObjectFn] {
  const [fileObject, setFileObject] = useState<FileObject | null>(null)

  const set = useCallback(
    (next: File | null) => {
      if (fileObject) {
        fileObject.clean()
      }

      if (next) {
        setFileObject(new FileObject(next))
      } else {
        setFileObject(null)
      }
    },
    [fileObject]
  )

  useEffect(() => {
    return () => {
      if (fileObject) {
        fileObject.clean()
      }
    }
  }, [fileObject])

  return [fileObject, set]
}

export function useImageDiffContext() {
  return useContext(ImageDiffContext)
}

export function useDispatchImageDiffContext() {
  return useContext(DispatchImageDiffContext)
}
