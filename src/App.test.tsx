import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import App from './App'

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  )
}

describe('Astra web shell', () => {
  it('renders the home experience with the featured title and rails', () => {
    renderApp()

    expect(
      screen.getByRole('heading', { level: 1, name: 'Dune: Part Two' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Top Matches' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Play Dune: Part Two' }),
    ).toHaveAttribute('href', '/watch/dune-part-two')
  })

  it('renders a title detail route', () => {
    renderApp('/title/arrival')

    expect(screen.getByRole('heading', { name: 'Arrival' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Play Arrival' })).toHaveAttribute(
      'href',
      '/watch/arrival',
    )
  })
})
