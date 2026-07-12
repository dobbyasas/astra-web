export type User = {
  id: number
  email: string
}

export type AuthResponse = {
  token: string
  user: User
}

export type WatchlistItem = {
  titleId: string
  createdAt: string
}

export type PlaybackProgress = {
  titleId: string
  episodeId: string | null
  progress: number
  updatedAt: string
}

export const apiBaseUrl =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? 'http://192.168.0.192:4000'

export function getServerMediaUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  return `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export async function register(email: string, password: string) {
  return request<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function login(email: string, password: string) {
  return request<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function getMe(token: string) {
  return request<{ user: User }>('/api/auth/me', {}, token)
}

export async function getWatchlist(token: string) {
  return request<{ items: WatchlistItem[] }>('/api/me/watchlist', {}, token)
}

export async function addToWatchlist(token: string, titleId: string) {
  return request<{ item: WatchlistItem }>(
    '/api/me/watchlist',
    {
      method: 'POST',
      body: JSON.stringify({ titleId }),
    },
    token,
  )
}

export async function removeFromWatchlist(token: string, titleId: string) {
  return request<{ ok: true }>(
    `/api/me/watchlist/${encodeURIComponent(titleId)}`,
    {
      method: 'DELETE',
    },
    token,
  )
}

export async function getPlaybackProgress(token: string) {
  return request<{ items: PlaybackProgress[] }>('/api/me/progress', {}, token)
}

export async function savePlaybackProgress(
  token: string,
  payload: {
    episodeId?: string
    progress: number
    titleId: string
  },
) {
  return request<{ item: PlaybackProgress }>(
    '/api/me/progress',
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    },
    token,
  )
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  token?: string,
): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(
      body?.message ?? body?.error ?? `Request failed: ${response.status}`,
    )
  }

  return response.json() as Promise<T>
}
