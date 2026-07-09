import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { User } from '@/lib/api'

type AuthMode = 'login' | 'register'

type AuthState = {
  dialogOpen: boolean
  mode: AuthMode
  token: string | null
  user: User | null
  closeDialog: () => void
  logout: () => void
  openDialog: (mode?: AuthMode) => void
  setSession: (token: string, user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      dialogOpen: false,
      mode: 'login',
      token: null,
      user: null,
      closeDialog: () => set({ dialogOpen: false }),
      logout: () => set({ token: null, user: null }),
      openDialog: (mode = 'login') => set({ dialogOpen: true, mode }),
      setSession: (token, user) => set({ dialogOpen: false, token, user }),
    }),
    {
      name: 'astra-auth',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
)
