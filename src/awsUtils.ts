export const fetchPortfolioFiles = async () => {
  const awsResourcesList = await fetchResourceTextFromAws("")
  const awsFilesList = awsResourcesList?.match(new RegExp("<Key>([^<]*)</Key>", "g"))?.map((key) => key.slice(5, key.length-6))
  if (!awsFilesList) throw new Error("Failed to fetch files list")

  const filesSplitByFolder = awsFilesList.map((filepath) => filepath.split("/"))
  const filesStructure = parseDirectory(filesSplitByFolder)

  return filesStructure
}

export async function fetchResourceTextFromAws(resourcePath: string) {
  if (resourcePath.startsWith("/")) {
    resourcePath = resourcePath.substring(1)
  }
  
  const awsListRequest = await fetch("https://kennamainportfolio.s3.us-east-2.amazonaws.com/" + resourcePath)
  if (!awsListRequest?.body) throw new Error("Cant fetch resource " + resourcePath)

  const awsResourceList = await readableStreamToString(awsListRequest.body)
  return awsResourceList
}

export async function fetchJsonFromAWS<T>(resourcePath: string) {
  const text = await fetchResourceTextFromAws(resourcePath)
  return JSON.parse(text) as T
}

async function readableStreamToString(readableStream: ReadableStream) {
  const reader = readableStream.getReader();
  let result = '';
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break; // No more data to read
    }

    if (value) {
      result += decoder.decode(value, { stream: true }); // Decode the chunk and append
    }
  }

  // Final decode to handle any remaining buffered data
  result += decoder.decode();

  return result;
}


// Directory parsing

export type DirectoryMetadata = {
  thumbnail?: string // filename of the thumbnail for this directory
  title?: string
  description?: string
  spacerImageFilepath?: string // if set, will add spacer images. if not, won't
}


export type Directory = {
  files: string[]
  folders: DirectoryList
  pwd: string
}

type DirectoryList = {
  [name: string]: Directory
}

type UnprocessedFolders = {
  [name: string]: string[][]
}

const parseDirectory = (files: string[][], pwd: string = "/"): Directory => {
  const directory = {files: [] as string[], folders: {} as UnprocessedFolders}

  files.map((filePath: string[]) => {
    if (filePath.length < 1) return
    if (filePath.length === 1) {
      directory.files.push(filePath[0])
      return
    }

    const folder = filePath[0] as string
    filePath = filePath.slice(1)

    if (!directory.folders[folder]) {
      directory.folders[folder] = []
    }

    directory.folders[folder].push(filePath)
  })

  const directoryList = {} as DirectoryList
  Object.keys(directory.folders).forEach(folderName => {
    directoryList[folderName] = parseDirectory(directory.folders[folderName], pwd + folderName + "/")
  });

  return {
    files: directory.files,
    folders: directoryList,
    pwd
  }
}
