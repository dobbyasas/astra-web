import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, vi } from 'vitest'

import App from './App'

function renderApp(initialPath = '/') {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialPath]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('Astra web shell', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string | URL | Request) => {
        if (String(url).endsWith('/api/media')) {
          return Response.json({
            movies: [
              {
                streamPath:
                  '/media/movies/Blade%20Runner%202049%20(2017)/Blade.Runner.2049.2017.720p.BluRay.x264-%5BYTS.AG%5D.mp4',
              },
              {
                streamPath:
                  '/media/movies/The%20Nightmare%20Before%20Christmas%20(1993)/The.Nightmare.Before.Christmas.1993.1080p.hevc.mp4',
              },
            ],
            series: [
              {
                streamPath:
                  '/media/series/Arcane%20(2021)/Season%2001/Arcane%20-%20S01E01%20-%20Welcome%20to%20the%20Playground%20-%20h265%20AC3.mp4',
              },
            ],
          })
        }

        return Response.json({}, { status: 404 })
      }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts on search and browsing with continue watching', () => {
    renderApp()

    expect(
      screen.getByRole('searchbox', { name: 'Search movies and series' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Continue Watching' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Movies & Series' }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: 'Blade Runner 2049' })[0],
    ).toHaveAttribute('href', '/watch/blade-runner-2049')
  })

  it('opens a series page with playable episodes', () => {
    renderApp('/series/arcane')

    expect(screen.getByRole('heading', { name: 'Arcane' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Episodes' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /S01E01/ })).toHaveAttribute(
      'href',
      '/watch/arcane/arcane-s01e01',
    )
  })
})
