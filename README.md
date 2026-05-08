# SKYBAR Finance Dashboard

A static, framework-free restaurant finance dashboard for daily operating entries, month/year filtering, KPI recalculation, and local browser persistence.

## Pages

- `index.html` — main dashboard with filters, KPI grid, entry form, edit/delete controls, and the daily entries table.
- `generic.html` — reusable internal operations review layout.
- `elements.html` — UI component library for the dashboard controls and cards.

## Core functionality

- Save daily entries for food revenue, beverage revenue, food cost, beverage cost, fixed cost, and daily budget.
- Prevent duplicate dates while still allowing an existing entry to be edited.
- Persist entries in `localStorage` so saved dashboard data remains after refresh.
- Filter dashboard results by year and month.
- Recalculate Daily Revenue, MTD Revenue, Food Revenue, Beverage Revenue, Food Cost %, Beverage Cost %, Fixed Cost %, GOP, and Budget Variance after every save, update, delete, or filter change.

## Structure

```text
/
├── index.html
├── generic.html
├── elements.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── dashboard.css
│   │   ├── components.css
│   ├── js/
│   │   ├── app.js
│   │   ├── dashboard.js
│   │   ├── calculations.js
│   │   ├── storage.js
│   │   ├── filters.js
│   ├── img/
│   ├── icons/
├── data/
│   ├── finance-data.json
└── README.md
```

## Local preview

Run a static server from the repository root:

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/` in a browser.
