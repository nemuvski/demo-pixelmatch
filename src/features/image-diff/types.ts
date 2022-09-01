/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types}
 */
export type ImageFileType =
  | 'image/apng'
  | 'image/bmp'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/pjpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/tiff'
  | 'image/webp'
  | 'image/x-icon'

export type ImageSize = {
  width: number
  height: number
}

export type DispatchFileObjectFn = (next: File | null) => void
