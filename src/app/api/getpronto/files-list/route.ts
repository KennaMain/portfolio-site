
type File = {
  name: string
  assetId: string
}

type DirectoryMetadata = {
  thumbnail?: string // filename of the thumbnail for this directory
  title?: string
  description?: string
  spacerImageFilepath?: string // if set, will add spacer images. if not, won't
}

type Directory = {
  files: File[]
  folders: DirectoryList
  pwd: string
  name?: string
  metadata?: DirectoryMetadata
}

type DirectoryList = {
  [name: string]: Directory
}

// export async function GET(request: Request, { paramsPromise }: { paramsPromise: Promise<Params> }) {
export async function GET(request: Request) {
  // try {
    const portfolio: Directory = JSON.parse(process.env.PORTFOLIO_FILE_STRUCTURE ?? '')
    return Response.json(portfolio, { status: 200 })
  // } catch (error) {
  //   console.log("issue happened")
  //   console.log(JSON.stringify(error))

  //   const message = error instanceof Error ? error.message : 'Unexpected error'
  //   return Response.json({error: {message}}, { status: 500 })
  // }
}