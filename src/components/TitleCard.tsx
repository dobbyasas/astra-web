import { Bookmark, Check, Film, MonitorPlay, Play } from 'lucide-react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'

import type { MediaTitle } from '@/data/catalog'
import { addToWatchlist, removeFromWatchlist } from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'

type TitleCardProps = {
  inWatchlist?: boolean
  onWatchlistChange?: () => void
  title: MediaTitle
}

export function TitleCard({
  inWatchlist = false,
  onWatchlistChange,
  title,
}: TitleCardProps) {
  const openDialog = useAuthStore((state) => state.openDialog)
  const token = useAuthStore((state) => state.token)
  const target =
    title.kind === 'series' ? `/series/${title.id}` : `/watch/${title.id}`
  const KindIcon = title.kind === 'series' ? MonitorPlay : Film

  async function handleWatchlist(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    if (!token) {
      openDialog('login')
      return
    }

    if (inWatchlist) {
      await removeFromWatchlist(token, title.id)
    } else {
      await addToWatchlist(token, title.id)
    }

    onWatchlistChange?.()
  }

  return (
    <article>
      <Link className="title-card" to={target} aria-label={title.name}>
        <img src={title.posterUrl} alt="" loading="lazy" />
        <span className="kind-badge" aria-label={title.kind}>
          <KindIcon size={16} aria-hidden="true" />
        </span>
        <button
          className="card-save-button"
          type="button"
          onClick={handleWatchlist}
          aria-label={
            inWatchlist
              ? `Remove ${title.name} from list`
              : `Add ${title.name} to list`
          }
        >
          {inWatchlist ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Bookmark size={16} aria-hidden="true" />
          )}
        </button>
        <div className="title-card-overlay">
          <h3>{title.name}</h3>
          <div className="card-meta">
            <span className="match">{title.match}%</span>
            <span>{title.year}</span>
            <span>{title.maturityRating}</span>
          </div>
          <span className="card-play-hint">
            <Play size={14} fill="currentColor" aria-hidden="true" />
            {title.kind === 'series' ? 'Episodes' : 'Play'}
          </span>
          {title.progress ? (
            <span
              className="progress-track"
              aria-label={`${title.progress}% watched`}
            >
              <span
                className="progress-bar"
                style={{ width: `${title.progress}%` }}
              />
            </span>
          ) : null}
        </div>
      </Link>
    </article>
  )
}
