import { create } from "zustand"
import fs from "@zenfs/core"

export interface SystemFiles {
    files: File[]
    currentDir: string,
    changeDir: (path: string) => string
    touchFile: (filename: string) => void
    redirectionFile: (file: File) => void
    appendRedirectionFile: (file: File) => void
    removeFile: (filename: string) => void
}

export type File = {
    name: string
    data: string
}

function replaceItemWithIndex<T>(data: T, arr: Array<T>, index: number): Array<T> {
  arr[index] = data

  return arr
}

function appendFileWithIndex(data: File, dir: string, arr: Array<File>, index: number): Array<File> {
  const oldFile = arr[index]

  oldFile.data = oldFile.data + `\n${data.data}`
    
  fs.writeFileSync(`${dir}/${oldFile.name}`, oldFile.data)

  return arr
}

function removeAfterLastSlash(str: string): string {
  const lastIndex = str.lastIndexOf('/');
  if (lastIndex === -1) {
    return str;
  }
  
  const dir = str.substring(0, lastIndex);

  return dir.length === 0 ? "/" : dir
}

function getLastPathSegment(path: string): string {
  if (path === "/") return "/";

  path = path.replace(/\/+$/, "");

  return path.substring(path.lastIndexOf("/") + 1);
}

export const useFiles = create<SystemFiles>()((set, get) => ({
  files: [],
  currentDir: "/",
  changeDir: (path) => {
    let error = ""
    let currentDir = get().currentDir
    const isAbsPath = path.slice(0, 1) === "/"

    if (isAbsPath) {
      currentDir = path
    }

    const availableDirs = fs.readdirSync(!isAbsPath ? currentDir : removeAfterLastSlash(currentDir))

    if (path === "..") {
      currentDir = removeAfterLastSlash(currentDir)
    } else if (path !== "." && !isAbsPath) {
      currentDir += `${currentDir === "/" ? "" : "/"}${path}`
    }

    if (!availableDirs.includes(!isAbsPath ? path : getLastPathSegment(path)) && path !== "." && currentDir !== "/") {
      currentDir = get().currentDir
      error = `cd: no such file or directory: ${path}`
    }

    set(() => ({
      currentDir: currentDir
    }))

    return error
  },
  touchFile: (filename) => {
    const files = get().files
    const currDir = get().currentDir
    const exists = files.findIndex(v => v.name === filename)
    if (exists === -1) {
      fs.writeFileSync(`${currDir}/${filename}`, "")

      set(({ files }) => ({
        files: files.concat({ name: filename, data: "" } as File)
      }))
    }
  },
  redirectionFile: (file) => {
    const files = get().files
    const currDir = get().currentDir
    const exists = files.findIndex(v => v.name === file.name)
    if (exists === -1) {
    // ajustar aqui parece que oide ter algo assim //tests.ts
      fs.writeFileSync(`${currDir}/${file.name}`, file.data)

      set(({ files }) => ({
        files: files.concat(file)
      }))
    } else {
      fs.writeFileSync(`${currDir}/${file.name}`, file.data)

      set(({ files }) => ({
        files: replaceItemWithIndex(file, files, exists)
      }))
    }
  },
  appendRedirectionFile: (file) => {
    const files = get().files
    const currDir = get().currentDir
    const exists = files.findIndex(v => v.name === file.name)
    if (exists === -1) {
      fs.writeFileSync(`${currDir}/${file.name}`, file.data)

      set(({ files }) => ({
        files: files.concat(file)
      }))
    } else {
      set(({ files }) => ({
        files: appendFileWithIndex(file, currDir, files, exists)
      }))
    }
  },
  removeFile: (filename) => {
    const currDir = get().currentDir
    fs.unlinkSync(`${currDir}/${filename}`)
    set(({ files }) => ({
      files: files.splice(files.findIndex(v => v.name !== filename), 1)
    }))
  },
}))
