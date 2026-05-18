
async function getFiles(page: number) {
    const response = await fetch(`https://api.getpronto.io/v1/files?page=${page}&pageSize=${20}`, { 
      method: "GET",
      headers: { "Authorization": "ApiKey " + process.env.API_KEY }
    })
    const responseJson = await response.json()
    return responseJson
}

export async function GET(request: Request) {
  
    const response = await getFiles(1)
    const extantFiles = response.files

    for (let i = 2; i <= response.pagination.totalPages; i++) {
      const resp = await getFiles(i)
      extantFiles.concat(resp.files)
    }
    
    console.log(extantFiles)

    return Response.json(extantFiles)
}