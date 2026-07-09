import { create } from 'zustand'

type PlaybackState = {
  currentTitleId: string | null
  muted: boolean
  setCurrentTitle: (titleId: string) => void
  toggleMuted: () => void
}

export const usePlaybackStore = create<PlaybackState>((set) => ({
  currentTitleId: null,
  muted: false,
  setCurrentTitle: (titleId) => set({ currentTitleId: titleId }),
  toggleMuted: () => set((state) => ({ muted: !state.muted })),
}))
