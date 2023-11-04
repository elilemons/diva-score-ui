import { secureStorage } from '@utils/storage'

export const get = async (
  url: string,
  options: RequestInit = { headers: {} },
): Promise<Response> => {
  const token = await secureStorage.getJWTToken()
  let headers = {}

  if (typeof options?.headers === 'object' && options.headers !== null) {
    headers = options.headers
  }

  const formattedOptions: RequestInit = {
    ...options,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
      ...headers,
    },
  }

  return fetch(url, formattedOptions)
}

export const post = async (
  url: string,
  options: RequestInit = { headers: {} },
): Promise<Response> => {
  const token = await secureStorage.getJWTToken()
  let headers = {}

  if (typeof options?.headers === 'object' && options.headers !== null) {
    headers = options.headers
  }

  const formattedOptions: RequestInit = {
    ...options,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
      ...headers,
    },
  }

  return fetch(url, formattedOptions)
}

export const patch = async (
  url: string,
  options: RequestInit = { headers: {} },
): Promise<Response> => {
  const token = await secureStorage.getJWTToken()
  let headers = {}

  if (typeof options?.headers === 'object' && options.headers !== null) {
    headers = options.headers
  }

  const formattedOptions: RequestInit = {
    ...options,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
      ...headers,
    },
  }

  return fetch(url, formattedOptions)
}

export const del = async (
  url: string,
  options: RequestInit = { headers: {} },
): Promise<Response> => {
  const token = await secureStorage.getJWTToken()
  let headers = {}

  if (typeof options?.headers === 'object' && options.headers !== null) {
    headers = options.headers
  }

  return fetch(url, {
    ...options,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
      ...headers,
    },
  })
}
