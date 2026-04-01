import { Link } from 'react-router-dom'
import { HomeNav } from '../components/HomeNav'

function IconOverview() {
  return (
    <svg
      className="h-7 w-7 text-[var(--color-accent)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
      />
    </svg>
  )
}

function IconTransactions() {
  return (
    <svg
      className="h-7 w-7 text-[var(--color-accent)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  )
}

function IconRoles() {
  return (
    <svg
      className="h-7 w-7 text-[var(--color-accent)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  )
}

const features = [
  {
    title: 'Numbers in one place',
    body: 'See how income, spending, and net balance relate, with simple charts that update from whatever list you are viewing.',
    icon: IconOverview,
  },
  {
    title: 'Work with the table',
    body: 'Narrow rows with search and filters, reorder by date or amount, and — when your role allows it — open forms to change the underlying list.',
    icon: IconTransactions,
  },
  {
    title: 'Two permission styles',
    body: 'Flip between a read-only layout and an editing layout to compare how the same screens behave when exports and forms are available.',
    icon: IconRoles,
  },
] as const

export function HomePage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-[var(--color-surface)]">
      <HomeNav />

      <section className="relative border-b border-[var(--color-border)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-90 dark:opacity-70"
          aria-hidden
          style={{
            background: `
              radial-gradient(ellipse 100% 80% at 50% -30%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 55%),
              radial-gradient(ellipse 70% 50% at 100% 10%, color-mix(in srgb, var(--color-accent-soft) 35%, transparent), transparent 50%),
              radial-gradient(ellipse 50% 40% at 0% 20%, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 45%)
            `,
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
          <p className="mb-4 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)]/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--color-ink-muted)] backdrop-blur">
            Client-side · Optional local save
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-tight">
            A quiet workspace for cash flow and categories.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-muted)]">
            This interface bundles a starter set of movements you can replace or
            extend yourself. Charts, summaries, and short notes are computed in
            the browser; nothing here talks to a bank or a hosted API.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/20 transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)]"
            >
              Open dashboard
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]/80 px-6 py-3.5 text-sm font-medium text-[var(--color-ink)] backdrop-blur transition hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-elevated)]"
            >
              See what&apos;s inside
            </a>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24"
        aria-labelledby="features-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="features-heading"
            className="text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl"
          >
            What you get on the inside
          </h2>
          <p className="mt-3 text-[var(--color-ink-muted)]">
            The goal is readability: fewer panels, obvious hierarchy, and enough
            interaction to stress-test lists, filters, and conditional controls.
          </p>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, body, icon: Icon }) => (
            <li
              key={title}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-sm transition hover:border-[var(--color-accent)]/25 hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-xl bg-[var(--color-accent-soft)]/60 p-3 transition group-hover:bg-[var(--color-accent-soft)]">
                <Icon />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-elevated)]/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {[
              {
                step: '1',
                title: 'Scan the headline figures',
                text: 'Cards condense totals; charts show how they evolved over the months in view.',
              },
              {
                step: '2',
                title: 'Shape the table',
                text: 'Combine search with type and category filters, then sort until the slice makes sense.',
              },
              {
                step: '3',
                title: 'Glance at generated notes',
                text: 'Short blurbs call out patterns so you are not hunting them only in the grid.',
              },
            ].map((item) => (
              <li key={item.step} className="relative text-center sm:text-left">
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-sm font-bold text-[var(--color-accent)]">
                  {item.step}
                </span>
                <h3 className="font-semibold text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-accent-soft)]/40 via-[var(--color-surface-elevated)] to-[var(--color-surface-elevated)] p-8 text-center shadow-sm sm:p-12 dark:from-[var(--color-accent-soft)]/20">
          <h2 className="text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
            Open the workspace
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[var(--color-ink-muted)]">
            Filters, appearance, and the selected role can be written to storage
            for this origin so a refresh does not wipe your last setup.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface-elevated)]"
          >
            Go to dashboard
          </Link>
        </div>
      </section>

      <footer className="border-t border-[var(--color-border)] py-8 text-center text-xs text-[var(--color-ink-muted)]">
        <p>
          No accounts or servers in this build — information you keep stays under
          this site&apos;s storage rules in your browser.
        </p>
      </footer>
    </div>
  )
}
