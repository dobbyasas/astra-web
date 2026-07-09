export type MediaTitle = {
  id: string
  name: string
  tagline: string
  synopsis: string
  year: number
  maturityRating: string
  runtime: string
  match: number
  genres: string[]
  posterUrl: string
  backdropUrl: string
  progress?: number
}

const imageBaseUrl = 'https://image.tmdb.org/t/p/original'

export const catalog: MediaTitle[] = [
  {
    id: 'dune-part-two',
    name: 'Dune: Part Two',
    tagline: 'Power, prophecy, and desert thunder.',
    synopsis:
      'Paul Atreides unites with Chani and the Fremen while choosing between revenge, love, and the fate of the known universe.',
    year: 2024,
    maturityRating: 'PG-13',
    runtime: '2h 46m',
    match: 98,
    genres: ['Sci-Fi', 'Epic', 'Drama'],
    posterUrl: `${imageBaseUrl}/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg`,
    backdropUrl: `${imageBaseUrl}/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg`,
    progress: 34,
  },
  {
    id: 'oppenheimer',
    name: 'Oppenheimer',
    tagline: 'The world forever changes in a flash.',
    synopsis:
      'A brilliant physicist leads the Manhattan Project and faces the moral aftershock of creating the atomic age.',
    year: 2023,
    maturityRating: 'R',
    runtime: '3h',
    match: 96,
    genres: ['Drama', 'Biography', 'History'],
    posterUrl: `${imageBaseUrl}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
    backdropUrl: `${imageBaseUrl}/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg`,
  },
  {
    id: 'blade-runner-2049',
    name: 'Blade Runner 2049',
    tagline: 'The future has a memory.',
    synopsis:
      'A young blade runner uncovers a buried secret that could unravel what remains of society.',
    year: 2017,
    maturityRating: 'R',
    runtime: '2h 44m',
    match: 94,
    genres: ['Sci-Fi', 'Noir', 'Thriller'],
    posterUrl: `${imageBaseUrl}/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg`,
    backdropUrl: `${imageBaseUrl}/sAtoMqDVhNDQBc3QJL3RF6hlhGq.jpg`,
    progress: 62,
  },
  {
    id: 'arrival',
    name: 'Arrival',
    tagline: 'Language is the first contact.',
    synopsis:
      'A linguist races to communicate with mysterious visitors before global fear becomes irreversible.',
    year: 2016,
    maturityRating: 'PG-13',
    runtime: '1h 56m',
    match: 93,
    genres: ['Sci-Fi', 'Mystery', 'Drama'],
    posterUrl: `${imageBaseUrl}/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg`,
    backdropUrl: `${imageBaseUrl}/yIZ1xendyqKvY3FGeeUYUd5X9Mm.jpg`,
  },
  {
    id: 'everything-everywhere',
    name: 'Everything Everywhere All at Once',
    tagline: 'Every choice becomes a universe.',
    synopsis:
      'An exhausted laundromat owner tumbles through alternate lives while trying to hold her family together.',
    year: 2022,
    maturityRating: 'R',
    runtime: '2h 20m',
    match: 95,
    genres: ['Adventure', 'Comedy', 'Drama'],
    posterUrl: `${imageBaseUrl}/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg`,
    backdropUrl: `${imageBaseUrl}/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg`,
  },
  {
    id: 'spider-verse',
    name: 'Spider-Man: Across the Spider-Verse',
    tagline: 'One mask, infinite worlds.',
    synopsis:
      'Miles Morales launches across the multiverse and collides with a team protecting its fragile web.',
    year: 2023,
    maturityRating: 'PG',
    runtime: '2h 20m',
    match: 97,
    genres: ['Animation', 'Action', 'Adventure'],
    posterUrl: `${imageBaseUrl}/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg`,
    backdropUrl: `${imageBaseUrl}/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg`,
  },
]
