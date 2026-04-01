import { Link, NavLink } from 'react-router-dom'
import { useFinance } from '../context/useFinance'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const { role, setRole } = useFinance()

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="shrink-0 text-lg font-semibold tracking-tight text-[var(--color-ink)] transition hover:text-[var(--color-accent)] sm:text-xl"
          >
            Personal finance
          </Link>
          <span
            className="hidden h-6 w-px bg-[var(--color-border)] sm:block"
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-ink-muted)]">
              Workspace
            </p>
            <h1 className="truncate text-lg font-semibold tracking-tight text-[var(--color-ink)] sm:text-xl">
              Dashboard
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <nav className="flex items-center gap-1" aria-label="Pages">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                    : 'text-[var(--color-ink-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]',
                ].join(' ')
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                    : 'text-[var(--color-ink-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]',
                ].join(' ')
              }
            >
              Dashboard
            </NavLink>
          </nav>
          <label className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)]">
            <span className="sr-only">Role</span>
            <span className="hidden sm:inline" aria-hidden>
              Role
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'viewer' | 'admin')}
              className="max-w-[7.5rem] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2 text-sm text-[var(--color-ink)] outline-none ring-[var(--color-accent)] focus:ring-2 sm:max-w-none sm:px-3"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
