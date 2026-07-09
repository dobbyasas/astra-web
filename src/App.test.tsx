import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

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
      screen.getAllByRole('link', { name: 'Dune: Part Two' })[0],
    ).toHaveAttribute('href', '/watch/dune-part-two')
  })

  it('opens a series page with playable episodes', () => {
    renderApp('/series/the-meridian')

    expect(
      screen.getByRole('heading', { name: 'The Meridian' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Episodes' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /S01E01/ })).toHaveAttribute(
      'href',
      '/watch/the-meridian/the-meridian-s01e01',
    )
  })
})
