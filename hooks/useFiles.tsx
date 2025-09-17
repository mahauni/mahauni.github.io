import { create } from "zustand"

export interface SystemFiles {
    files: File[]
    touchFile: (filename: string) => void
    redirectionFile: (file: File) => void
    appendRedirectionFile: (file: File) => void
    removeFile: (filename: string) => void
}

export type File = {
    name: string
    extension: string | null
    data: string
}

function replaceItemWithIndex<T>(data: T, arr: Array<T>, index: number): Array<T> {
  arr[index] = data

  return arr
}

function appendFileWithIndex(data: File, arr: Array<File>, index: number): Array<File> {
  const oldFile = arr[index]

  oldFile.data = oldFile.data + `\n${data.data}`

  return arr
}

export const useFiles = create<SystemFiles>()((set, get) => ({
  files: [],
  touchFile: (filename) => {
    const files = get().files
    const exists = files.findIndex(v => v.name === filename)
    if (exists === -1) {
      set(({ files }) => ({
        files: files.concat({ name: filename, data: "" } as File)
      }))
    }
  },
  redirectionFile: (file) => {
    const files = get().files
    const exists = files.findIndex(v => v.name === file.name)
    if (exists === -1) {
      set(({ files }) => ({
        files: files.concat(file)
      }))
    } else {
      set(({ files }) => ({
        files: replaceItemWithIndex(file, files, exists)
      }))
    }
  },
  appendRedirectionFile: (file) => {
    const files = get().files
    const exists = files.findIndex(v => v.name === file.name)
    if (exists === -1) {
      set(({ files }) => ({
        files: files.concat(file)
      }))
    } else {
      set(({ files }) => ({
        files: appendFileWithIndex(file, files, exists)
      }))
    }
  },
  removeFile: (filename) => {
    set(({ files }) => ({
      files: files.splice(files.findIndex(v => v.name !== filename), 1)
    }))
  },
}))
