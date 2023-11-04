export const joinClassNames = (classNames: Array<string | undefined>): string => [...classNames].filter(Boolean).join(" ")
