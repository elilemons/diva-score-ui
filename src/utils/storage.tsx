import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin'

const JWT_STORAGE__KEY = `${process.env.REACT_APP_COOKIE_PREFIX}__jwt-token`
const getJWTToken = async (): Promise<string | undefined> => {
  return SecureStoragePlugin.get({ key: JWT_STORAGE__KEY })
    .then(res => res.value)
    .catch(() => undefined)
}
const setJWTToken = (value: string): Promise<{ value: boolean }> =>
  SecureStoragePlugin.set({ key: JWT_STORAGE__KEY, value })

export const secureStorage = {
  JWT_STORAGE__KEY,
  getJWTToken,
  setJWTToken,
}
