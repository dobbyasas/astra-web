import { Search } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { TitleCard } from '@/components/TitleCard'
import { getPlaybackProgress, getWatchlist } from '@/lib/api'
import {
  getContinueWatchingTitles,
  getProgressKey,
  getRandomTitleBatch,
  PAGE_SIZE,
  searchTitles,
} from '@/lib/catalog'
import { useAuthStore } from '@/store/useAuthStore'
import { usePlaybackStore } from '@/store/usePlaybackStore'
import type { MediaTitle } from '@/data/catalog'

type FeedItem = {
  instanceId: string
  title: MediaTitle
}

export function HomePage() {
  const queryClient = useQueryClient()
  const token = useAuthStore((state) => state.token)
  const localProgress = usePlaybackStore((state) => state.progressByKey)
  const [query, setQuery] = useState('')
  const [feed, setFeed] = useState<FeedItem[]>(() =>
    toFeedItems(getRandomTitleBatch([], PAGE_SIZE)),
  )
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const progressQuery = useQuery({
    queryKey: ['playback-progress', token],
    queryFn: () => getPlaybackProgress(token ?? ''),
    enabled: Boolean(token),
    retry: false,
  })

  const watchlistQuery = useQuery({
    queryKey: ['watchlist', token],
    queryFn: () => getWatchlist(token ?? ''),
    enabled: Boolean(token),
    retry: false,
  })

  const progressByKey = useMemo(() => {
    const remoteProgress = Object.fromEntries(
      progressQuery.data?.items.map((item) => [
        getProgressKey(item.titleId, item.episodeId ?? undefined),
        item.progress,
      ]) ?? [],
    )

    return {
      ...localProgress,
      ...remoteProgress,
    }
  }, [localProgress, progressQuery.data?.items])

  const watchlistIds = useMemo(
    () => new Set(watchlistQuery.data?.items.map((item) => item.titleId) ?? []),
    [watchlistQuery.data?.items],
  )

  const continueWatching = useMemo(
    () => getContinueWatchingTitles(progressByKey),
    [progressByKey],
  )

  const visibleTitles = query.trim()
    ? searchTitles(query).map((title) => ({ instanceId: title.id, title }))
    : feed

  const loadMore = useCallback(() => {
    setFeed((currentFeed) => [
      ...currentFeed,
      ...toFeedItems(
        getRandomTitleBatch(
          currentFeed.map((item) => item.title.id),
          PAGE_SIZE,
        ),
      ),
    ])
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current

    if (!sentinel || query.trim()) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          loadMore()
        }
      },
      { rootMargin: '900px 0px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore, query])

  function refreshWatchlist() {
    void queryClient.invalidateQueries({ queryKey: ['watchlist', token] })
  }

  return (
    <section className="home-page">
      <div className="search-hero">
        <label className="mega-search" aria-label="Search movies and series">
          <Search size={30} aria-hidden="true" />
          <input
            aria-label="Search movies and series"
            autoFocus
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies and series"
            type="search"
            value={query}
          />
        </label>
      </div>

      <div className="content-stack">
        {continueWatching.length ? (
          <section className="media-section" aria-labelledby="continue-heading">
            <div className="section-header">
              <h2 id="continue-heading">Continue Watching</h2>
            </div>
            <div className="title-grid title-grid--compact">
              {continueWatching.map((title) => (
                <TitleCard
                  inWatchlist={watchlistIds.has(title.id)}
                  key={title.id}
                  onWatchlistChange={refreshWatchlist}
                  title={title}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="media-section" aria-labelledby="browse-heading">
          <div className="section-header">
            <h2 id="browse-heading">
              {query.trim() ? 'Search Results' : 'Movies & Series'}
            </h2>
            <span>{visibleTitles.length} titles</span>
          </div>

          <div className="title-grid">
            {visibleTitles.map((item) => (
              <TitleCard
                inWatchlist={watchlistIds.has(item.title.id)}
                key={item.instanceId}
                onWatchlistChange={refreshWatchlist}
                title={item.title}
              />
            ))}
          </div>

          {!visibleTitles.length ? (
            <div className="empty-state">
              <h1>No titles found</h1>
              <p>Try a different search.</p>
            </div>
          ) : null}

          <div ref={sentinelRef} className="feed-sentinel" aria-hidden="true" />
        </section>
      </div>
    </section>
  )
}

function toFeedItems(titles: MediaTitle[]): FeedItem[] {
  return titles.map((title) => ({
    instanceId: `${title.id}-${crypto.randomUUID()}`,
    title,
  }))
}
