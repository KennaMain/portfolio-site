
//
// Types
//

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

//
// Fetch stuff from google
//

// returns the Directory structure of all files in the portfolio
export const fetchPortfolioFiles = async (): Promise<Directory> => {
  console.log("fetching file structure")
  const googleCloudResourcesXML = await fetchResourceTextFromGoogleCloud("")

  const fileStructure = parseBucketXMLToObject(googleCloudResourcesXML)
  console.log("File structure")
  console.log(fileStructure)

  return fileStructure
}

const parseBucketXMLToObject = (xmlString: string): Directory => {
  // Helper function to parse XML string
  function parseXML(xmlStr: string) {
    const parser = new DOMParser();
    return parser.parseFromString(xmlStr, "text/xml");
  }
  
  // Extract Key elements from the XML
  function extractKeys(xmlDoc: any) {
    const keyElements = xmlDoc.getElementsByTagName("Key");
    const keys = [];
    
    for (let i = 0; i < keyElements.length; i++) {
      keys.push(keyElements[i].textContent);
    }
    
    return keys;
  }
  
  // Build the folder structure from keys
  function buildStructure(keys: string[]) {
    const result: Directory = {
      files: [],
      folders: {},
      pwd: "/"
    };
    
    keys.forEach(key => {
      // Split the key by '/' to get path segments
      const segments = key.split('/').filter(segment => segment.trim() !== '');
      
      if (segments.length === 1) {
        // Root level file
        result.files.push(segments[0]);
      } else {
        // File within a folder
        const fileName = segments.pop();
        let current = result;
        
        // Navigate/create folder structure
        for (let i = 0; i < segments.length; i++) {
          const folderName = segments[i];
          
          if (!current.folders[folderName]) {
            current.folders[folderName] = {
              files: [],
              folders: {},
              pwd: '/' + segments.slice(0, i + 1).join('/') + '/'
            };
          }
          
          // Move to next level
          current = current.folders[folderName];
        }
        
        // Add file to current folder
        if (fileName != undefined) {
          current.files.push(fileName);
        }

        if (fileName?.charAt(0) === ".") {
          console.error("ERROR: File " + current.pwd + fileName + " does not have a valid filename.")
        }
      }
    });
    
    return result;
  }
  
  try {
    const xmlDoc = parseXML(xmlString);
    const keys = extractKeys(xmlDoc);
    return buildStructure(keys);
  } catch (error) {
    console.error("Error parsing XML:", error);
    return {
      files: [],
      folders: {},
      pwd: "/"
    };
  }
}

export async function fetchJsonFromGoogleCloud<T>(resourcePath: string) {
  console.log("Fetching JSON asset " + resourcePath)
  const text = await fetchResourceTextFromGoogleCloud(resourcePath)
  return JSON.parse(text) as T
}

//
// helpers
//

async function fetchResourceTextFromGoogleCloud(resourcePath: string) {
  if (resourcePath.startsWith("/")) {
    resourcePath = resourcePath.substring(1)
  }
  
  const response = await fetch(getAssetUrl(resourcePath))//"https://storage.googleapis.com/kennamainportfolio" + resourcePath)
  if (!response.ok) throw new Error("Cant fetch resource " + resourcePath)

  const resourceText = response.text()
  return resourceText
}



// Etc

export const S3_BASE_URL = "https://storage.googleapis.com/kennamainportfolio"
export const getAssetUrl = (assetName: string) => {
  if (!assetName.startsWith("/")) assetName = "/" + assetName
  if (assetName.startsWith("/site-assets")) return assetName

  return `${S3_BASE_URL}${assetName}`
}