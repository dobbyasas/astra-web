import type { MediaTitle } from '@/data/catalog'

import { TitleCard } from './TitleCard'

type MediaRailProps = {
  id?: string
  kicker?: string
  titles: MediaTitle[]
  title: string
}

export function MediaRail({ id, kicker, titles, title }: MediaRailProps) {
  return (
    <section
      className="rail"
      id={id}
      aria-labelledby={`${id ?? title}-heading`}
    >
      <div className="rail-header">
        <h2 className="rail-title" id={`${id ?? title}-heading`}>
          {title}
        </h2>
        {kicker ? <span className="rail-kicker">{kicker}</span> : null}
      </div>

      <div className="rail-track">
        {titles.map((mediaTitle) => (
          <TitleCard key={mediaTitle.id} title={mediaTitle} />
        ))}
      </div>
    </section>
  )
}
