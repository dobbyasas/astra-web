import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { catalog, type MediaTitle } from '@/data/catalog'
import { getMediaLibrary, type MediaLibrary } from '@/lib/api'

const browserPlayableExtensions = /\.(m4v|mov|mp4|webm)$/i

export function usePlayableCatalog() {
  const mediaQuery = useQuery({
    queryKey: ['media-library'],
    queryFn: getMediaLibrary,
    refetchInterval: 30_000,
    retry: false,
  })

  const availableStreamPaths = useMemo(
    () =>
      mediaQuery.data ? getAvailableStreamPaths(mediaQuery.data) : undefined,
    [mediaQuery.data],
  )

  const titles = useMemo(
    () => filterCatalogByAvailableStreams(catalog, availableStreamPaths),
    [availableStreamPaths],
  )

  return {
    isLoaded: Boolean(mediaQuery.data),
    titles,
  }
}

function filterCatalogByAvailableStreams(
  titles: MediaTitle[],
  availableStreamPaths?: Set<string>,
) {
  if (!availableStreamPaths) {
    return titles
  }

  return titles.flatMap((title) => {
    if (title.kind === 'movie') {
      return title.streamPath &&
        availableStreamPaths.has(normalizeStreamPath(title.streamPath))
        ? [title]
        : []
    }

    const episodes =
      title.episodes?.filter(
        (episode) =>
          episode.streamPath &&
          availableStreamPaths.has(normalizeStreamPath(episode.streamPath)),
      ) ?? []

    if (!episodes.length) {
      return []
    }

    return [
      {
        ...title,
        episodes,
        runtime: `${episodes.length} episode${episodes.length === 1 ? '' : 's'}`,
      },
    ]
  })
}

function getAvailableStreamPaths(library: MediaLibrary) {
  return new Set(
    [...library.movies, ...library.series]
      .map((item) => item.streamPath)
      .filter((streamPath) => browserPlayableExtensions.test(streamPath))
      .map(normalizeStreamPath),
  )
}

function normalizeStreamPath(streamPath: string) {
  try {
    return decodeURI(streamPath).toLowerCase()
  } catch {
    return streamPath.toLowerCase()
  }
}
