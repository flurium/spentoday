async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (!event.target || !(event.target.result instanceof ArrayBuffer)) {
        reject(new Error("Failed to read the file."))
        return
      }
      resolve(event.target.result)
    }
    reader.readAsArrayBuffer(file)
  })
}

async function createWebPBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (webpBlob) => {
        if (!webpBlob) {
          reject(new Error("Failed to convert the image to WebP."))
          return
        }
        resolve(webpBlob)
      },
      "image/webp",
      1.0
    )
  })
}

/** Can throw */
export async function convertToWebP(inputFile: File): Promise<File> {
  const arrayBuffer = await readFileAsArrayBuffer(inputFile)

  const blob = new Blob([arrayBuffer], { type: inputFile.type })
  const image = new Image()

  return new Promise<File>((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = image.width
      canvas.height = image.height

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Failed to create a canvas context."))
        return
      }

      ctx.drawImage(image, 0, 0)

      createWebPBlob(canvas)
        .then((webpBlob) => {
          // Create a File from the WebP Blob
          const webpFile = new File(
            [webpBlob],
            inputFile.name.replace(/\.[^.]+$/, ".webp"),
            {
              type: "image/webp",
              lastModified: Date.now()
            }
          )
          resolve(webpFile)
        })
        .catch((error) => reject(error))
    }

    image.src = URL.createObjectURL(blob)
  })
}
