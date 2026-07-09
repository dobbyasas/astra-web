import { create } from 'zustand'

type PlaybackState = {
  currentEpisodeId: string | null
  currentTitleId: string | null
  muted: boolean
  progressByKey: Record<string, number>
  saveProgress: (key: string, progress: number) => void
  setCurrentTitle: (titleId: string, episodeId?: string) => void
  toggleMuted: () => void
}

export const usePlaybackStore = create<PlaybackState>((set) => ({
  currentEpisodeId: null,
  currentTitleId: null,
  muted: false,
  progressByKey: {},
  saveProgress: (key, progress) =>
    set((state) => ({
      progressByKey: {
        ...state.progressByKey,
        [key]: progress,
      },
    })),
  setCurrentTitle: (titleId, episodeId = undefined) =>
    set({ currentEpisodeId: episodeId ?? null, currentTitleId: titleId }),
  toggleMuted: () => set((state) => ({ muted: !state.muted })),
}))
