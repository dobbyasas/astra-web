import { ArrowLeft, Maximize, Pause, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { savePlaybackProgress } from '@/lib/api'
import {
  getEpisodeById,
  getEpisodeLabel,
  getProgressKey,
  getTitleById,
} from '@/lib/catalog'
import { useAuthStore } from '@/store/useAuthStore'
import { usePlaybackStore } from '@/store/usePlaybackStore'

export function WatchPage() {
  const { episodeId, titleId } = useParams()
  const title = getTitleById(titleId)
  const episode = getEpisodeById(title, episodeId)
  const muted = usePlaybackStore((state) => state.muted)
  const progressByKey = usePlaybackStore((state) => state.progressByKey)
  const saveLocalProgress = usePlaybackStore((state) => state.saveProgress)
  const setCurrentTitle = usePlaybackStore((state) => state.setCurrentTitle)
  const toggleMuted = usePlaybackStore((state) => state.toggleMuted)
  const token = useAuthStore((state) => state.token)

  const progressKey = useMemo(
    () => getProgressKey(titleId ?? '', episodeId),
    [episodeId, titleId],
  )
  const [progress, setProgress] = useState(
    () =>
      progressByKey[progressKey] ?? episode?.progress ?? title?.progress ?? 7,
  )

  useEffect(() => {
    if (title) {
      setCurrentTitle(title.id, episode?.id)
    }
  }, [episode?.id, setCurrentTitle, title])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((currentProgress) => Math.min(currentProgress + 1, 96))
    }, 1800)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!title) {
      return
    }

    saveLocalProgress(progressKey, progress)

    if (token) {
      void savePlaybackProgress(token, {
        episodeId,
        progress,
        titleId: title.id,
      }).catch(() => undefined)
    }
  }, [episodeId, progress, progressKey, saveLocalProgress, title, token])

  if (!title || (title.kind === 'series' && !episode)) {
    return <Navigate to="/" replace />
  }

  const playbackTitle = episode ? `${title.name}: ${episode.title}` : title.name

  return (
    <section className="watch-page" aria-labelledby="player-title">
      <div className="player-frame">
        <img src={title.backdropUrl} alt="" />
        <div className="player-overlay">
          <Link
            className="secondary-button player-back"
            to={episode ? `/series/${title.id}` : '/'}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back
          </Link>

          <div>
            <span className="kind-label">
              {episode ? getEpisodeLabel(episode) : 'Movie'}
            </span>
            <h1 className="player-title" id="player-title">
              {playbackTitle}
            </h1>
          </div>

          <div className="player-controls">
            <div className="player-timeline" aria-label="Playback progress">
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className="player-actions">
              <button className="primary-button" type="button">
                <Pause size={18} fill="currentColor" aria-hidden="true" />
                Pause
              </button>
              <button
                className="icon-button"
                type="button"
                onClick={toggleMuted}
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? (
                  <VolumeX size={18} aria-hidden="true" />
                ) : (
                  <Volume2 size={18} aria-hidden="true" />
                )}
              </button>
              <button
                className="icon-button"
                type="button"
                aria-label="Fullscreen"
              >
                <Maximize size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
