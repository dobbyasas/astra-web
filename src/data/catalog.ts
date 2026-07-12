export type MediaKind = 'movie' | 'series'

export type Episode = {
  id: string
  title: string
  season: number
  episode: number
  runtime: string
  synopsis: string
  progress?: number
  streamPath?: string
}

export type MediaTitle = {
  id: string
  kind: MediaKind
  name: string
  tagline: string
  synopsis: string
  year: number
  runtime: string
  genres: string[]
  posterUrl: string
  backdropUrl: string
  progress?: number
  streamPath?: string
  episodes?: Episode[]
}

type SeedTitle = Omit<MediaTitle, 'id' | 'posterUrl' | 'backdropUrl'> & {
  episodeCount?: number
}

const seedTitles: SeedTitle[] = [
  {
    kind: 'movie',
    name: 'Dune: Part Two',
    tagline: 'Power, prophecy, and desert thunder.',
    synopsis:
      'A fugitive heir follows a dangerous path through faith, revenge, and impossible futures.',
    year: 2024,
    runtime: '2h 46m',
    genres: ['Sci-Fi', 'Epic', 'Drama'],
    progress: 34,
  },
  {
    kind: 'series',
    name: 'Arcane',
    tagline: 'Two sisters. One city about to break.',
    synopsis:
      'In Piltover and Zaun, invention, power, and old wounds pull two sisters onto opposite sides of a growing war.',
    year: 2021,
    runtime: '18 episodes',
    genres: ['Animation', 'Action', 'Fantasy'],
    progress: 1,
    episodes: createArcaneEpisodes(),
  },
  {
    kind: 'series',
    name: 'The Meridian',
    tagline: 'A city that only appears at midnight.',
    synopsis:
      'A missing archivist leaves behind a map to a hidden city where every street remembers a different century.',
    year: 2026,
    runtime: '8 episodes',
    genres: ['Mystery', 'Sci-Fi', 'Drama'],
    progress: 58,
    episodeCount: 8,
  },
  {
    kind: 'movie',
    name: 'Oppenheimer',
    tagline: 'The world forever changes in a flash.',
    synopsis:
      'A brilliant physicist leads a secret project and faces the moral aftershock of the atomic age.',
    year: 2023,
    runtime: '3h',
    genres: ['Drama', 'Biography', 'History'],
  },
  {
    kind: 'series',
    name: 'Orbital Kitchen',
    tagline: 'Fine dining at zero gravity.',
    synopsis:
      'A chaotic crew runs the solar system’s most impossible restaurant while smuggling secrets between colonies.',
    year: 2025,
    runtime: '10 episodes',
    genres: ['Comedy', 'Sci-Fi', 'Adventure'],
    episodeCount: 10,
  },
  {
    kind: 'movie',
    name: 'Blade Runner 2049',
    tagline: 'The future has a memory.',
    synopsis:
      'A young investigator uncovers a buried secret that could unravel what remains of society.',
    year: 2017,
    runtime: '2h 44m',
    genres: ['Sci-Fi', 'Noir', 'Thriller'],
    progress: 62,
    streamPath:
      '/media/movies/Blade%20Runner%202049%20(2017)/Blade.Runner.2049.2017.720p.BluRay.x264-%5BYTS.AG%5D.mp4',
  },
  {
    kind: 'movie',
    name: 'The Nightmare Before Christmas',
    tagline: 'A holiday dream with a crooked smile.',
    synopsis:
      'Jack Skellington stumbles into Christmas Town and turns two holidays into one strange musical nightmare.',
    year: 1993,
    runtime: '1h 16m',
    genres: ['Animation', 'Fantasy', 'Musical'],
    streamPath:
      '/media/movies/The%20Nightmare%20Before%20Christmas%20(1993)/The.Nightmare.Before.Christmas.1993.1080p.hevc.mp4',
  },
  {
    kind: 'series',
    name: 'Northstar Bureau',
    tagline: 'Cold cases at the edge of the world.',
    synopsis:
      'Investigators in an Arctic research town discover every disappearance points back to the same signal.',
    year: 2026,
    runtime: '6 episodes',
    genres: ['Crime', 'Mystery', 'Thriller'],
    episodeCount: 6,
  },
  {
    kind: 'movie',
    name: 'Arrival',
    tagline: 'Language is the first contact.',
    synopsis:
      'A linguist races to communicate with mysterious visitors before global fear becomes irreversible.',
    year: 2016,
    runtime: '1h 56m',
    genres: ['Sci-Fi', 'Mystery', 'Drama'],
  },
  {
    kind: 'series',
    name: 'Signal Room',
    tagline: 'Every call changes the timeline.',
    synopsis:
      'Emergency dispatchers begin receiving calls from tomorrow and must decide which futures are worth saving.',
    year: 2024,
    runtime: '9 episodes',
    genres: ['Thriller', 'Drama', 'Sci-Fi'],
    progress: 22,
    episodeCount: 9,
  },
  {
    kind: 'movie',
    name: 'Everything Everywhere All at Once',
    tagline: 'Every choice becomes a universe.',
    synopsis:
      'An exhausted laundromat owner tumbles through alternate lives while trying to hold her family together.',
    year: 2022,
    runtime: '2h 20m',
    genres: ['Adventure', 'Comedy', 'Drama'],
  },
  {
    kind: 'movie',
    name: 'Spider-Man: Across the Spider-Verse',
    tagline: 'One mask, infinite worlds.',
    synopsis:
      'Miles Morales launches across the multiverse and collides with a team protecting its fragile web.',
    year: 2023,
    runtime: '2h 20m',
    genres: ['Animation', 'Action', 'Adventure'],
  },
  {
    kind: 'movie',
    name: 'Glass Harbor',
    tagline: 'The water keeps its witnesses.',
    synopsis:
      'A retired diver returns home after a storm exposes a submerged neighborhood and one impossible body.',
    year: 2026,
    runtime: '1h 48m',
    genres: ['Mystery', 'Drama'],
  },
  {
    kind: 'series',
    name: 'Afterlight',
    tagline: 'The power went out. The stars answered.',
    synopsis:
      'When Earth loses its electrical grid, a family follows strange constellations toward a new civilization.',
    year: 2025,
    runtime: '8 episodes',
    genres: ['Drama', 'Adventure', 'Sci-Fi'],
    episodeCount: 8,
  },
  {
    kind: 'movie',
    name: 'Redline Kyoto',
    tagline: 'One night. No brakes.',
    synopsis:
      'A courier with a ruined reputation takes a high-speed job through neon streets and old rivalries.',
    year: 2026,
    runtime: '1h 52m',
    genres: ['Action', 'Crime'],
  },
  {
    kind: 'series',
    name: 'Archive 71',
    tagline: 'Some tapes record back.',
    synopsis:
      'Restorers digitizing a lost broadcast discover the show is changing after each playback.',
    year: 2023,
    runtime: '7 episodes',
    genres: ['Horror', 'Mystery'],
    episodeCount: 7,
  },
  {
    kind: 'movie',
    name: 'The Last Orchard',
    tagline: 'A harvest worth crossing worlds for.',
    synopsis:
      'A botanist protects the final living seeds on a moon where terraforming has begun to think for itself.',
    year: 2025,
    runtime: '1h 41m',
    genres: ['Adventure', 'Family', 'Sci-Fi'],
  },
  {
    kind: 'series',
    name: 'Velvet Circuit',
    tagline: 'Fame is the easiest system to hack.',
    synopsis:
      'A pop star and an ex-security engineer expose a surveillance ring hidden inside a global tour.',
    year: 2026,
    runtime: '10 episodes',
    genres: ['Drama', 'Thriller', 'Music'],
    episodeCount: 10,
  },
  {
    kind: 'movie',
    name: 'Moonbase Tuesday',
    tagline: 'The worst day to save humanity.',
    synopsis:
      'A maintenance team becomes the only line of defense when a diplomatic moonbase locks down.',
    year: 2024,
    runtime: '1h 57m',
    genres: ['Comedy', 'Sci-Fi'],
  },
  {
    kind: 'series',
    name: 'Blackwater Saints',
    tagline: 'Old money. New ghosts.',
    synopsis:
      'A family inheritance pulls three siblings into a coastal town where every fortune has a body count.',
    year: 2025,
    runtime: '8 episodes',
    genres: ['Drama', 'Crime'],
    episodeCount: 8,
  },
  {
    kind: 'movie',
    name: 'Quiet Atlas',
    tagline: 'The map was listening.',
    synopsis:
      'Two cartographers discover a blank region that redraws itself around whoever enters.',
    year: 2024,
    runtime: '1h 45m',
    genres: ['Fantasy', 'Mystery'],
  },
  {
    kind: 'movie',
    name: 'Thunder Road Home',
    tagline: 'A storm, a family, one last race.',
    synopsis:
      'A mechanic returns to the circuit to save her father’s garage and settle a debt from the past.',
    year: 2026,
    runtime: '1h 50m',
    genres: ['Drama', 'Sport'],
  },
  {
    kind: 'series',
    name: 'Crown of Static',
    tagline: 'Royalty in the age of broken signals.',
    synopsis:
      'A young queen inherits a kingdom where every political message arrives with a deadly delay.',
    year: 2025,
    runtime: '9 episodes',
    genres: ['Fantasy', 'Political', 'Drama'],
    episodeCount: 9,
  },
  {
    kind: 'movie',
    name: 'Neon Pilgrims',
    tagline: 'Faith, fuel, and a stolen spaceship.',
    synopsis:
      'Runaways cross a corporate star route to reach a forbidden planet that may not exist.',
    year: 2026,
    runtime: '2h 4m',
    genres: ['Sci-Fi', 'Adventure'],
  },
  {
    kind: 'series',
    name: 'Hotel Palindrome',
    tagline: 'Check in yesterday. Check out never.',
    synopsis:
      'Guests in a luxury hotel relive one day in reverse until they admit why they came.',
    year: 2024,
    runtime: '6 episodes',
    genres: ['Mystery', 'Drama'],
    episodeCount: 6,
  },
  {
    kind: 'movie',
    name: 'The Paper Sun',
    tagline: 'A counterfeit dawn can still burn.',
    synopsis:
      'A forger hired to invent a royal prophecy realizes the kingdom is making it come true.',
    year: 2025,
    runtime: '1h 54m',
    genres: ['Fantasy', 'Drama'],
  },
]

const episodeTitles = [
  'First Light',
  'A Room With No Windows',
  'The Quiet Signal',
  'Borrowed Names',
  'Static Bloom',
  'The Long Way Down',
  'No Safe Frequency',
  'A Door Left Open',
  'Midnight Terms',
  'The Shape of Home',
]

const episodeSynopses = [
  'A strange discovery turns an ordinary night into the first real clue.',
  'The group follows a lead that asks more from them than anyone expected.',
  'An ally changes sides after a message arrives from somewhere impossible.',
  'The truth behind the first disappearance begins to fracture the team.',
]

export const catalog: MediaTitle[] = seedTitles
  .filter((title) => title.streamPath ?? hasPlayableEpisodes(title))
  .map((title, index) => {
    const id = slugify(title.name)
    const posterUrl = posterFor(id, index)
    const backdropUrl = backdropFor(id, index)

    return {
      ...title,
      id,
      posterUrl,
      backdropUrl,
      episodes:
        title.episodes ??
        (title.kind === 'series'
          ? createEpisodes(id, title.episodeCount ?? 8, title.progress)
          : undefined),
    }
  })

function hasPlayableEpisodes(title: SeedTitle) {
  return title.episodes?.some((episode) => episode.streamPath)
}

function createArcaneEpisodes(): Episode[] {
  const episodes = [
    [1, 1, 'Welcome to the Playground', 'h265'],
    [1, 2, 'Some Mysteries Are Better Left Unsolved', 'h265'],
    [1, 3, 'The Base Violence Necessary for Change', 'h265'],
    [1, 4, 'Happy Progress Day!', 'h265'],
    [1, 5, 'Everybody Wants to Be My Enemy', 'h265'],
    [1, 6, 'When These Walls Come Tumbling Down', 'h265'],
    [1, 7, 'The Boy Savior', 'h265'],
    [1, 8, 'Oil and Water', 'h265'],
    [1, 9, 'The Monster You Created', 'h265'],
    [2, 1, 'Heavy Is the Crown', 'h265'],
    [2, 2, 'Watch It All Burn', 'h265'],
    [2, 3, 'Finally Got the Name Right', 'h265'],
    [2, 4, 'Paint the Town Blue', 'h265'],
    [2, 5, 'Blisters and Bedrock', 'h265'],
    [2, 6, 'The Message Hidden Within the Pattern', 'h265'],
    [2, 7, "Pretend Like It's the First Time", 'x264'],
    [2, 8, 'Killing Is a Cycle', 'h265'],
    [2, 9, 'The Dirt Under Your Nails', 'x264'],
  ] as const

  return episodes.map(([season, episode, title, codec]) => {
    const episodeCode = `S${String(season).padStart(2, '0')}E${String(
      episode,
    ).padStart(2, '0')}`
    const fileName = `Arcane - ${episodeCode} - ${title} - ${codec} AC3.mp4`

    return {
      id: `arcane-s${String(season).padStart(2, '0')}e${String(
        episode,
      ).padStart(2, '0')}`,
      title,
      season,
      episode,
      runtime: '42m',
      synopsis:
        season === 1
          ? 'Piltover and Zaun move closer to open conflict as family loyalties fracture.'
          : 'The war reshapes every alliance as old choices demand a cost.',
      streamPath: `/media/series/Arcane%20(2021)/Season%20${String(
        season,
      ).padStart(2, '0')}/${encodeURIComponent(fileName)}`,
    }
  })
}

function createEpisodes(
  seriesId: string,
  count: number,
  seriesProgress = 0,
): Episode[] {
  return Array.from({ length: count }, (_, index) => {
    const episode = index + 1

    return {
      id: `${seriesId}-s01e${String(episode).padStart(2, '0')}`,
      title: episodeTitles[index % episodeTitles.length],
      season: 1,
      episode,
      runtime: `${42 + (index % 8)}m`,
      synopsis: episodeSynopses[index % episodeSynopses.length],
      progress: episode === 1 && seriesProgress ? seriesProgress : undefined,
    }
  })
}

function posterFor(id: string, index: number) {
  return `https://picsum.photos/seed/astra-${id}-${index}-poster/640/960`
}

function backdropFor(id: string, index: number) {
  return `https://picsum.photos/seed/astra-${id}-${index}-wide/1600/900`
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
