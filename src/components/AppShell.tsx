import { LogOut, UserRound } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import { useAuthStore } from '@/store/useAuthStore'

import { AstraLogo } from './AstraLogo'
import { AuthDialog } from './AuthDialog'

export function AppShell() {
  const logout = useAuthStore((state) => state.logout)
  const openDialog = useAuthStore((state) => state.openDialog)
  const user = useAuthStore((state) => state.user)

  return (
    <div className="app-shell">
      <header className="top-nav">
        <AstraLogo />

        <div className="nav-actions">
          {user ? (
            <>
              <span className="session-chip">
                <UserRound size={16} aria-hidden="true" />
                {user.email}
              </span>
              <button
                className="icon-button"
                type="button"
                onClick={logout}
                aria-label="Log out"
              >
                <LogOut size={18} aria-hidden="true" />
              </button>
            </>
          ) : (
            <>
              <button
                className="secondary-button"
                type="button"
                onClick={() => openDialog('login')}
              >
                Log In
              </button>
              <button
                className="primary-button"
                type="button"
                onClick={() => openDialog('register')}
              >
                Register
              </button>
            </>
          )}
        </div>
      </header>

      <main className="main-stage">
        <Outlet />
      </main>
      <AuthDialog />
    </div>
  )
}
