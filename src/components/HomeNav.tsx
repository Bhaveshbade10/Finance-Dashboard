import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

export function HomeNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/80 bg-[var(--color-surface-elevated)]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-[var(--color-ink)] transition hover:text-[var(--color-accent)] sm:text-xl"
        >
          Personal finance
        </Link>
        <nav
          className="flex items-center gap-2 sm:gap-3"
          aria-label="Primary"
        >
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
                  : 'bg-[var(--color-accent)] text-white shadow-sm hover:opacity-90',
              ].join(' ')
            }
          >
            Dashboard
          </NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
