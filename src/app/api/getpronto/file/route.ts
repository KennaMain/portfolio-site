// app/api/file/route.ts

export async function GET(request: Request) {
  try {
    // Get the URL and extract the query parameter
    const { searchParams } = new URL(request.url)
    const assetId = searchParams.get('assetId')
    
    if (!assetId) {
      return new Response('Asset ID is required', { status: 400 })
    }
    
    // Fetch the image from GetPronto
    const imageBlob = await getFile(assetId)
    
    return new Response(imageBlob, {
      status: 200,
      headers: {
        'Content-Type': imageBlob.type || 'image/webp',
        'Cache-Control': 'public, max-age=3600',
      }
    })
  } catch (error) {
    console.error('Error fetching image:', error)
    return new Response('Failed to fetch image', { status: 500 })
  }
}

async function getFile(filepath: string): Promise<Blob> {
  // const response = await fetch(`https://api.getpronto.io/v1/file/${filepath}`, { 
  const response = await fetch(`https://api.getpronto.io/v1/file/shrimp.webp`, { 
    method: "GET",
    headers: { 
      "Authorization": "ApiKey " + process.env.API_KEY
    }
  })
  
  if (!response.ok) {
    throw new Error(`GetPronto API error: ${response.status} ${response.statusText}`)
  }
  
  return response.blob()
}