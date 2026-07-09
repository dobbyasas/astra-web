import { catalog } from '@/data/catalog'

export const featuredTitle = catalog[0]

export function getTitleById(titleId: string | undefined) {
  return catalog.find((title) => title.id === titleId)
}

export function getTitlesByGenre(genre: string) {
  return catalog.filter((title) => title.genres.includes(genre))
}

export function getContinueWatching() {
  return catalog.filter((title) => Number(title.progress) > 0)
}

export function getTopMatches() {
  return [...catalog].sort((a, b) => b.match - a.match)
}
