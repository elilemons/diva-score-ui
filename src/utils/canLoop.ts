export const canLoop = (array: unknown[] | undefined): boolean => {
  if (!array) return false
  return Array.isArray(array) && array.length > 0
}
