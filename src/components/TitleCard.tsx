import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

import type { MediaTitle } from '@/data/catalog'

type TitleCardProps = {
  title: MediaTitle
}

export function TitleCard({ title }: TitleCardProps) {
  return (
    <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.18 }}>
      <Link
        className="title-card"
        to={`/title/${title.id}`}
        aria-label={title.name}
      >
        <img src={title.posterUrl} alt="" loading="lazy" />
        <div className="title-card-overlay">
          <h3>{title.name}</h3>
          <div className="card-meta">
            <span className="match">{title.match}%</span>
            <span>{title.year}</span>
            <span>{title.maturityRating}</span>
          </div>
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
    </motion.article>
  )
}
