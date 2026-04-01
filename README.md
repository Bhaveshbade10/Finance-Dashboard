# Finance Dashboard

A small, interactive finance dashboard built for a frontend assessment. It uses **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Recharts** for visualizations. Data is **mocked** and optionally **persisted in `localStorage`** (transactions, theme, and demo role).

## Setup

Requirements: **Node.js 18+** and npm.

```bash
cd finance-dashboard
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

```bash
npm run build   # production build
npm run preview # serve the build locally
```

## Features (assignment mapping)

| Requirement | Implementation |
|-------------|----------------|
| **Dashboard overview** | Summary cards: total balance, income, expenses. **Balance trend** (area chart by month). **Spending by category** (horizontal bar chart for expenses). |
| **Transactions** | Table with date, description, category, type (income/expense), amount. **Search**, category & type **filters**, **sort** by date/amount/category with asc/desc toggle. |
| **Role-based UI** | Header **role dropdown**: **Viewer** (read-only, no add/edit/delete/export) vs **Admin** (full CRUD + CSV/JSON export). No backend; role is stored locally for the demo. |
| **Insights** | Cards for **highest spending category**, **month-over-month spending** comparison, and a short **balance trajectory** observation. |
| **State** | `FinanceProvider` + React **Context** for transactions, filters, role, and theme; derived lists via `useMemo`. |
| **UX** | Responsive layout, empty states (no data / no filter matches), dark mode toggle, accessible table and dialog labels. |

## Optional enhancements included

- **Dark mode** (toggle + persistence)
- **localStorage** for transactions, theme, and role
- **Export** CSV and JSON (admin only)
- Light **transitions** on cards and table rows

## Project structure

- `src/context/` — global state (`FinanceProvider`, `financeContext`, `useFinance`)
- `src/data/` — seed mock transactions
- `src/components/` — layout, charts, transactions, insights, modal form
- `src/utils/` — formatting, filtering/sorting, insights, **stored JSON validation**

## Assumptions

- Currency is **USD** for display only.
- Dates are stored as `YYYY-MM-DD` strings.
- “Total balance” is **all-time** income minus expenses over the loaded dataset.

## Reliability & polish

- **localStorage** payloads are **validated** on load; corrupt or non-array JSON falls back to mock data. Invalid rows inside an array are dropped.
- **Charts** use fixed height, `min-w-0` in the grid, and `ResponsiveContainer` `minWidth` / `minHeight` to avoid layout warnings and zero-size measure issues.
- **Charts code** is **lazy-loaded** so the first paint stays lighter; a short skeleton shows while the chunk loads.
- **Transaction modal**: Escape closes, backdrop click closes, body scroll locked while open, first field focused, amounts must be **greater than zero**.

## Reset demo data

In the browser devtools console, run:

```js
localStorage.removeItem('zorvyn-finance-transactions')
location.reload()
```

Or clear site data for the origin. Other keys: `zorvyn-finance-theme`, `zorvyn-finance-role`.

## License

Submitted as evaluation work; use only as permitted by the assessor.
