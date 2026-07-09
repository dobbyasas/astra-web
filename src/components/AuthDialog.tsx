import { X } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { login, register } from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'

export function AuthDialog() {
  const closeDialog = useAuthStore((state) => state.closeDialog)
  const dialogOpen = useAuthStore((state) => state.dialogOpen)
  const mode = useAuthStore((state) => state.mode)
  const openDialog = useAuthStore((state) => state.openDialog)
  const setSession = useAuthStore((state) => state.setSession)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!dialogOpen) {
    return null
  }

  const isRegister = mode === 'register'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')

    try {
      const result = isRegister
        ? await register(email, password)
        : await login(email, password)
      setSession(result.token, result.user)
      setEmail('')
      setPassword('')
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Something went wrong',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-backdrop" role="presentation">
      <section
        className="auth-dialog"
        aria-labelledby="auth-title"
        role="dialog"
        aria-modal="true"
      >
        <button
          className="icon-button auth-close"
          type="button"
          onClick={closeDialog}
        >
          <X size={18} aria-hidden="true" />
          <span className="sr-only">Close</span>
        </button>

        <h2 id="auth-title">{isRegister ? 'Create Account' : 'Log In'}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              autoComplete="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              minLength={4}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button className="primary-button" disabled={busy} type="submit">
            {busy ? 'Working...' : isRegister ? 'Register' : 'Log In'}
          </button>
        </form>

        <button
          className="text-button"
          type="button"
          onClick={() => openDialog(isRegister ? 'login' : 'register')}
        >
          {isRegister ? 'Already have an account?' : 'Need an account?'}
        </button>
      </section>
    </div>
  )
}
