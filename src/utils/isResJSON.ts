export const isResJSON = (res: Response): boolean => res.headers.get("content-type")?.indexOf("application/json") !== -1
