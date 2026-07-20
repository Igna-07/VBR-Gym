export const API_URL = 'http://localhost:3000'

export function apiFetch(path: string, init?: RequestInit) {
  const url = path.startsWith('http') ? path : `${API_URL}${path}`
  return fetch(url, { ...init, credentials: 'include' })
}
