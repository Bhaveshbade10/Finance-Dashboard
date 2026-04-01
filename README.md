# Personal finance dashboard

A responsive single-page app for exploring income, expenses, and category trends. Built with **React 19**, **TypeScript**, **Vite**, **React Router**, **Tailwind CSS v4**, and **Recharts**. Sample transactions ship with the repo; you can edit them in the UI and persist changes in **`localStorage`**.

**Routes:** `/` — landing page. `/dashboard` — full workspace (figures, charts, table, insights).

## Prerequisites

- **Node.js 18+**
- npm

## Commands

```bash
cd finance-dashboard
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

```bash
npm run build   # production bundle
npm run preview # serve ./dist locally
```

## What it does

- **Figures:** running balance, total income, total expenses (from the loaded dataset).
- **Charts:** balance by month (area), expenses by category (horizontal bars).
- **Transactions:** searchable, filterable, sortable table; income vs expense styling.
- **Roles:** choose **Viewer** (read-only) or **Admin** (create, update, delete, export). Enforced in the UI only; there is no server.
- **Insights:** simple text summaries (e.g. top category, recent month comparison).
- **Theme:** light / dark toggle, remembered per origin.

## Layout

- `src/context/` — React context for transactions, filters, role, theme
- `src/pages/` — home and dashboard routes
- `src/components/` — navigation, charts, table, forms, panels
- `src/data/` — `sampleTransactions.ts` (starting list)
- `src/utils/` — formatting, filters, chart inputs, safe parsing of stored JSON

## Notes

- Amounts are shown in **USD** for display.
- Dates are stored as **`YYYY-MM-DD`** strings.
- **Balance** here means cumulative income minus expenses over all loaded rows.

## Stored data

Keys used in `localStorage`: `pf-ui-v1-transactions`, `pf-ui-v1-theme`, `pf-ui-v1-role`.

To wipe saved transactions and reload sample data from the bundle:

```js
localStorage.removeItem('pf-ui-v1-transactions')
location.reload()
```

Invalid stored JSON falls back to the bundled sample list.

## License

MIT
