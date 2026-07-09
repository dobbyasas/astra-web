import { ArrowLeft, Play, Plus } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { getTitleById } from '@/lib/catalog'
import { usePlaybackStore } from '@/store/usePlaybackStore'

export function TitlePage() {
  const { titleId } = useParams()
  const title = getTitleById(titleId)
  const setCurrentTitle = usePlaybackStore((state) => state.setCurrentTitle)

  if (!title) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="detail-page" aria-labelledby="detail-title">
      <div className="detail-backdrop" aria-hidden="true">
        <img src={title.backdropUrl} alt="" />
      </div>

      <div className="detail-grid">
        <div className="detail-poster">
          <img src={title.posterUrl} alt="" />
        </div>

        <div className="detail-copy">
          <Link className="secondary-button" to="/">
            <ArrowLeft size={18} aria-hidden="true" />
            Back
          </Link>
          <h1 id="detail-title">{title.name}</h1>
          <p className="detail-tagline">{title.tagline}</p>
          <div className="meta-line">
            <span>{title.year}</span>
            <span>{title.runtime}</span>
          </div>
          <p className="detail-synopsis">{title.synopsis}</p>
          <div className="genre-list" aria-label="Genres">
            {title.genres.map((genre) => (
              <span className="pill" key={genre}>
                {genre}
              </span>
            ))}
          </div>

          <div className="detail-actions">
            <Link
              className="primary-button"
              to={`/watch/${title.id}`}
              onClick={() => setCurrentTitle(title.id)}
              aria-label={`Play ${title.name}`}
            >
              <Play size={18} fill="currentColor" aria-hidden="true" />
              Play
            </Link>
            <button className="secondary-button" type="button">
              <Plus size={18} aria-hidden="true" />
              My List
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
