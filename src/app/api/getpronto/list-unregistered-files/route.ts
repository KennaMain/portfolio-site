

type File = string
// export type File = {
//   name: string
//   assetId: string
// }

type DirectoryMetadata = {
  thumbnail?: string // filename of the thumbnail for this directory
  title?: string
  description?: string
  spacerImageFilepath?: string // if set, will add spacer images. if not, won't
}

export type Directory = {
  files: File[]
  folders: DirectoryList
  pwd: string
  name?: string
  metadata?: DirectoryMetadata
}

type DirectoryList = {
  [name: string]: Directory
}

// TODO: fix this thing, it doesn't flatten correctly
function flattenDirectory(dir: Directory) {
  console.log('processing dir ' + dir.pwd + ". subdirs.length: " + Object.values(dir.folders).length + ". dir.files.length: " + dir.files.length)

  const subdirs = Object.values(dir.folders)
  if (subdirs.length === 0) return dir.files

  const files = [...dir.files]
  for(const subdir of subdirs) {
    files.concat(flattenDirectory(subdir))
  }
  console.log("returning files: " + files.length)
  return files
}

function allFilesCurrentlyRegisteredInPortfolio() {
  console.log("ENV VARLUE")
  console.log(process.env.PORTFOLIO_FILE_STRUCTURE)
  const portfolio: Directory = JSON.parse(process.env.PORTFOLIO_FILE_STRUCTURE ?? '')
  const files = flattenDirectory(portfolio)

  console.log("\n\n\n\nPORTFOLIO\n")
  console.log(portfolio)
  console.log("\n\n\n\nFILES\n")
  console.log(files)

  return files
}

type GetprontoFilesResponse = {
  files: {
    "id": string,
    "name": string,
    "secureUrl": string,
    "secureThumbnailUrl": string,
    "rawUrl": string,
    "type": string,
    "rawType": string, // mimetype
    "size": string, //eg: "8.2 MB"
    "rawSize": number, //eg: 8555450
    "updated": string, // "20 hours ago",
    "rawUpdated": string, //"2026-05-18T00:47:20.407Z",
    "width": number, // 1013,
    "height": number, // 750,
    "disabled": boolean,
    "folderId": string|null
  }[],

  pagination: {
    "page": number,
    "pageSize": number,
    "totalCount": number,
    "totalPages": number
  }
}

async function getFiles(page: number): Promise<GetprontoFilesResponse> {
    const response = await fetch(`https://api.getpronto.io/v1/files?page=${page}&pageSize=${20}`, { 
      method: "GET",
      headers: { "Authorization": "ApiKey " + process.env.API_KEY }
    })
    const responseJson = await response.json()
    return responseJson as GetprontoFilesResponse
}

export async function GET(request: Request) {
  // try {
    // const params = (await paramsPromise) ?? {}
    // const pageSize = 20

    const registeredFiles = allFilesCurrentlyRegisteredInPortfolio()
    // const registeredSetldjslfjk = new Set(registeredFiles.map(f => f.assetId))
    // const registeredSetldjslfjk = new Set(registeredFiles)
    // console.log(`reg files: ${registeredSetldjslfjk}`)
    // throw new Error()

  // "pagination": {
  //   "page": 2,
  //   "pageSize": 20,
  //   "totalCount": 33,
  //   "totalPages": 2
  // }
    const response = await getFiles(1)
    // const extantFiles: [{assetId: string, name: string}] = response.files.map((f: any) => {return {assetId: f.id, name: f.name}})
    const extantFiles: string[] = response.files.map((f: any) => f.secureUrl)

    for (let i = 2; i <= response.pagination.totalPages; i++) {
      const resp = await getFiles(i)
      // extantFiles.concat(resp.files.map((f: any) => {return {assetId: f.id, name: f.name}}))
      extantFiles.concat(resp.files.map((f: any) => f.secureUrl))
    }

    // const registeredSet = new Set(registeredFiles.map(f => f.assetId))
    const registeredSet = new Set(registeredFiles)
    const extantSet = new Set(extantFiles)

    console.log(`Extant set size: ${extantSet.size}, registeredSetSize: ${registeredSet.size} `)

    const newFileIds = extantSet.difference(registeredSet)
    const newFiles = extantFiles.filter(f => newFileIds.has(f))

    return Response.json(newFiles, { status: 200 })

    // const response = await fetch(`https://api.getpronto.io/v1/folders`, { 
    //   method: "GET",
    //   headers: { "Authorization": "ApiKey " + process.env.API_KEY }
    // })
    // const responseJson = await response.json()
    // console.log(responseJson)

    // return Response.json(responseJson, { status: 200 })
  // } catch (error) {
  //   console.log("issue happened")
  //   console.log(JSON.stringify(error))

  //   const message = error instanceof Error ? error.message : 'Unexpected error'
  //   return Response.json({error: {message}}, { status: 500 })
  // }
}