import { useFinance } from '../context/useFinance'

export function Header() {
  const { role, setRole, theme, toggleTheme } = useFinance()

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-ink-muted)]">
            Finance
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-2xl">
            Dashboard
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)]">
            <span className="sr-only">Role</span>
            <span aria-hidden>Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'viewer' | 'admin')}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none ring-[var(--color-accent)] focus:ring-2"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] transition hover:bg-[var(--color-accent-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </header>
  )
}
