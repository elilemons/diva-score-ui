export type GenericStatusErrorType = {
  status: number
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}
export function GenericStatusError(params: GenericStatusErrorType): GenericStatusErrorType {
  return params
}
