import { ArrowLeft, Play } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { getEpisodeLabel, getTitleById } from '@/lib/catalog'

export function SeriesPage() {
  const { titleId } = useParams()
  const title = getTitleById(titleId)

  if (!title || title.kind !== 'series') {
    return <Navigate to="/" replace />
  }

  return (
    <section className="series-page" aria-labelledby="series-title">
      <div className="detail-backdrop" aria-hidden="true">
        <img src={title.backdropUrl} alt="" />
      </div>

      <div className="series-layout">
        <div className="detail-poster">
          <img src={title.posterUrl} alt="" />
        </div>

        <div className="series-copy">
          <Link className="secondary-button" to="/">
            <ArrowLeft size={18} aria-hidden="true" />
            Back
          </Link>
          <span className="kind-label">Series</span>
          <h1 id="series-title">{title.name}</h1>
          <p className="detail-tagline">{title.tagline}</p>
          <p className="detail-synopsis">{title.synopsis}</p>
        </div>
      </div>

      <section className="episode-list" aria-labelledby="episodes-heading">
        <h2 id="episodes-heading">Episodes</h2>
        <div className="episode-grid">
          {title.episodes?.map((episode) => (
            <Link
              className="episode-card"
              key={episode.id}
              to={`/watch/${title.id}/${episode.id}`}
            >
              <span>{getEpisodeLabel(episode)}</span>
              <strong>{episode.title}</strong>
              <p>{episode.synopsis}</p>
              <small>{episode.runtime}</small>
              <Play size={18} fill="currentColor" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </section>
  )
}
