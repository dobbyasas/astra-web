import { Hero } from '@/components/Hero'
import { MediaRail } from '@/components/MediaRail'
import { catalog } from '@/data/catalog'
import {
  featuredTitle,
  getContinueWatching,
  getTitlesByGenre,
  getTopMatches,
} from '@/lib/catalog'

export function HomePage() {
  return (
    <>
      <Hero title={featuredTitle} />
      <div className="content-stack">
        <MediaRail
          id="my-list"
          title="Continue Watching"
          kicker="Tonight"
          titles={getContinueWatching()}
        />
        <MediaRail
          id="films"
          title="Top Matches"
          kicker="Astra picks"
          titles={getTopMatches()}
        />
        <MediaRail
          id="series"
          title="Sci-Fi Worlds"
          titles={getTitlesByGenre('Sci-Fi')}
        />
        <MediaRail title="New on Astra" titles={catalog.slice().reverse()} />
      </div>
    </>
  )
}
