export class FileObject {
  file: File
  objectURL: string

  constructor(file: File) {
    this.file = file
    this.objectURL = URL.createObjectURL(file)
  }

  clean() {
    if (this.objectURL) {
      URL.revokeObjectURL(this.objectURL)
    }
  }
}
