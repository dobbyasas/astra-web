import { catalog, type Episode, type MediaTitle } from '@/data/catalog'

export const PAGE_SIZE = 20

export function getTitleById(
  titleId: string | undefined,
  titles: MediaTitle[] = catalog,
) {
  return titles.find((title) => title.id === titleId)
}

export function getEpisodeById(
  title: MediaTitle | undefined,
  episodeId: string | undefined,
) {
  return title?.episodes?.find((episode) => episode.id === episodeId)
}

export function getRandomTitleBatch(
  existingTitleIds: string[],
  limit = PAGE_SIZE,
  titles: MediaTitle[] = catalog,
) {
  const existing = new Set(existingTitleIds)
  const unseenTitles = shuffle(
    titles.filter((title) => !existing.has(title.id)),
  )
  const batch = unseenTitles.slice(0, limit)

  if (batch.length >= limit) {
    return batch
  }

  return [...batch, ...shuffle(titles).slice(0, limit - batch.length)]
}

export function searchTitles(query: string, titles: MediaTitle[] = catalog) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return []
  }

  return titles.filter((title) => {
    const haystack = [
      title.name,
      title.kind,
      title.tagline,
      title.synopsis,
      title.genres.join(' '),
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalizedQuery)
  })
}

export function getContinueWatchingTitles(
  progressByKey: Record<string, number>,
  titles: MediaTitle[] = catalog,
) {
  return titles
    .map((title) => ({
      ...title,
      progress: getTitleProgress(title, progressByKey),
    }))
    .filter(
      (title) => Number(title.progress) > 0 && Number(title.progress) < 95,
    )
    .slice(0, 8)
}

export function getProgressKey(titleId: string, episodeId?: string) {
  return episodeId ? `${titleId}:${episodeId}` : titleId
}

export function getEpisodeLabel(episode: Episode) {
  return `S${String(episode.season).padStart(2, '0')}E${String(episode.episode).padStart(2, '0')}`
}

function getTitleProgress(
  title: MediaTitle,
  progressByKey: Record<string, number>,
) {
  const storedMovieProgress = progressByKey[getProgressKey(title.id)]

  if (storedMovieProgress) {
    return storedMovieProgress
  }

  if (title.kind === 'series') {
    const episodeProgress = title.episodes
      ?.map(
        (episode) =>
          progressByKey[getProgressKey(title.id, episode.id)] ??
          episode.progress,
      )
      .find((progress) => Number(progress) > 0)

    return episodeProgress ?? title.progress
  }

  return title.progress
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5)
}
