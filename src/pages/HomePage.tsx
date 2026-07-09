import { Search } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { TitleCard } from '@/components/TitleCard'
import { catalog, type MediaTitle } from '@/data/catalog'
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

type FeedItem = {
  instanceId: string
  title: MediaTitle
}

export function HomePage() {
  const queryClient = useQueryClient()
  const openDialog = useAuthStore((state) => state.openDialog)
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
  const savedTitles = useMemo(
    () => catalog.filter((title) => watchlistIds.has(title.id)),
    [watchlistIds],
  )
  const isSearching = Boolean(query.trim())

  const visibleTitles = isSearching
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
    <section
      className={isSearching ? 'home-page home-page--searching' : 'home-page'}
    >
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

      {isSearching ? (
        <section
          className="search-results-panel"
          aria-labelledby="search-results-heading"
        >
          <div className="section-header">
            <h2 id="search-results-heading">Search Results</h2>
            <span>{visibleTitles.length} titles</span>
          </div>

          <div className="title-grid title-grid--results">
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
            <div className="empty-state empty-state--search">
              <h1>No titles found</h1>
              <p>Try a different search.</p>
            </div>
          ) : null}
        </section>
      ) : (
        <div className="content-stack">
          {continueWatching.length ? (
            <section
              className="media-section"
              aria-labelledby="continue-heading"
            >
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

          <section
            className="media-section saved-section"
            aria-labelledby="saved-heading"
          >
            <div className="section-header">
              <h2 id="saved-heading">Saved Movies & Series</h2>
              {savedTitles.length ? (
                <span>{savedTitles.length} saved</span>
              ) : null}
            </div>

            {token && savedTitles.length ? (
              <div className="title-grid title-grid--compact">
                {savedTitles.map((title) => (
                  <TitleCard
                    inWatchlist
                    key={title.id}
                    onWatchlistChange={refreshWatchlist}
                    title={title}
                  />
                ))}
              </div>
            ) : (
              <div className="saved-empty">
                <p>
                  {token
                    ? 'Save movies and series with the bookmark button and they will show up here.'
                    : 'Log in to keep a personal saved list across devices.'}
                </p>
                {!token ? (
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => openDialog('login')}
                  >
                    Log In
                  </button>
                ) : null}
              </div>
            )}
          </section>

          <section className="media-section" aria-labelledby="browse-heading">
            <div className="section-header">
              <h2 id="browse-heading">Movies & Series</h2>
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

            <div
              ref={sentinelRef}
              className="feed-sentinel"
              aria-hidden="true"
            />
          </section>
        </div>
      )}
    </section>
  )
}

function toFeedItems(titles: MediaTitle[]): FeedItem[] {
  return titles.map((title) => ({
    instanceId: `${title.id}-${crypto.randomUUID()}`,
    title,
  }))
}
