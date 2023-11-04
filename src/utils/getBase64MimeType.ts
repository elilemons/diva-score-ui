export const getBase64MimeType = (encoded: string): string | null => {
  let result = null

  if (typeof encoded !== "string") {
    return result
  }

  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)

  if (mime && mime.length) {
    ;[, result] = mime
  }

  return result
}
