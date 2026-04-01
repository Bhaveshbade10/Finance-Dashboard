import { useFinance } from '../context/useFinance'

export function ThemeToggle() {
  const { theme, toggleTheme } = useFinance()

  return (
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
  )
}
