export async function srcToFile(src: string, fileName: string, mimeType: string): Promise<File> {
  return (await fetch(src)
      .then(async function (res) {
        return await res.arrayBuffer()
      })
      .then(function (buf) {
        return new File([buf], fileName, {type: mimeType})
      })
  )
}


