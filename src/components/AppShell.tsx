import { Bell, Clapperboard, Search } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="top-nav">
        <NavLink to="/" className="brand" aria-label="Astra home">
          <span className="brand-mark">
            <Clapperboard size={18} aria-hidden="true" />
          </span>
          <span>Astra</span>
        </NavLink>

        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink to="/">Home</NavLink>
          <a href="#films">Films</a>
          <a href="#series">Series</a>
          <a href="#my-list">My List</a>
        </nav>

        <div className="nav-actions">
          <label className="search-box" aria-label="Search titles">
            <Search size={16} aria-hidden="true" />
            <input type="search" placeholder="Search" />
          </label>
          <button
            className="icon-button"
            type="button"
            aria-label="Notifications"
          >
            <Bell size={18} aria-hidden="true" />
          </button>
          <span className="avatar" aria-label="Current profile">
            A
          </span>
        </div>
      </header>

      <main className="main-stage">
        <Outlet />
      </main>
    </div>
  )
}
