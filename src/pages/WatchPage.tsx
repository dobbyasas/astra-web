import { Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { getTitleById } from '@/lib/catalog'
import { usePlaybackStore } from '@/store/usePlaybackStore'

export function WatchPage() {
  const { titleId } = useParams()
  const title = getTitleById(titleId)
  const muted = usePlaybackStore((state) => state.muted)
  const setCurrentTitle = usePlaybackStore((state) => state.setCurrentTitle)
  const toggleMuted = usePlaybackStore((state) => state.toggleMuted)

  useEffect(() => {
    if (title) {
      setCurrentTitle(title.id)
    }
  }, [setCurrentTitle, title])

  if (!title) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="watch-page" aria-labelledby="player-title">
      <div className="player-frame">
        <img src={title.backdropUrl} alt="" />
        <div className="player-overlay">
          <div>
            <p className="eyebrow">
              <Play size={16} fill="currentColor" aria-hidden="true" />
              Now Playing
            </p>
            <h1 className="player-title" id="player-title">
              {title.name}
            </h1>
          </div>

          <div className="player-controls">
            <div className="player-timeline" aria-label="Playback progress">
              <span />
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
              <Link className="secondary-button" to={`/title/${title.id}`}>
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
