import { Info, Play, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

import type { MediaTitle } from '@/data/catalog'
import { usePlaybackStore } from '@/store/usePlaybackStore'

type HeroProps = {
  title: MediaTitle
}

export function Hero({ title }: HeroProps) {
  const setCurrentTitle = usePlaybackStore((state) => state.setCurrentTitle)

  return (
    <section className="hero" aria-labelledby="featured-title">
      <div className="hero-backdrop" aria-hidden="true">
        <img src={title.backdropUrl} alt="" />
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <p className="eyebrow">
          <Play size={16} fill="currentColor" aria-hidden="true" />
          Featured Tonight
        </p>
        <h1 id="featured-title">{title.name}</h1>
        <p className="hero-tagline">{title.tagline}</p>
        <div className="meta-line" aria-label="Title details">
          <span>{title.year}</span>
          <span>{title.runtime}</span>
        </div>
        <p className="hero-synopsis">{title.synopsis}</p>

        <div className="hero-actions">
          <Link
            className="primary-button"
            to={`/watch/${title.id}`}
            onClick={() => setCurrentTitle(title.id)}
            aria-label={`Play ${title.name}`}
          >
            <Play size={18} fill="currentColor" aria-hidden="true" />
            Play
          </Link>
          <Link className="secondary-button" to={`/title/${title.id}`}>
            <Info size={18} aria-hidden="true" />
            More Info
          </Link>
          <button
            className="icon-button"
            type="button"
            aria-label="Add to list"
          >
            <Plus size={18} aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </section>
  )
}
