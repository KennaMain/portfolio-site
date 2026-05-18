
//
// Types
//

export type EmptyString = ""

export type DirectoryMetadata = {
  thumbnail?: string // filename of the thumbnail for this directory
  title?: string
  description?: string
  spacerImageFilepath?: string // if set, will add spacer images. if not, won't
}

export type Directory = {
  files: string[]
  folders: DirectoryList
  pwd: EmptyString
  name?: string
  metadata?: DirectoryMetadata
}

type DirectoryList = {
  [name: string]: Directory
}

//
// Fetch stuff from getpronto
//

export const getAssetUrl = (assetName: string): string => {
  return assetName
}

export const fetchJsonFromGoogleCloud = async (x: any) => {
  throw new Error("Not implemented")
}

export const fetchPortfolioFiles = async (): Promise<Directory> => {
  const response = fetch("/api/getpronto/files-list")
  return (await response).json()
}