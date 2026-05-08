# SKYBAR Finance Dashboard

A clean, from-scratch executive finance dashboard for restaurant operations. The project is built as static HTML, CSS, JavaScript, and JSON data with no inherited templates or framework dependencies.

## Pages

- `index.html` — main restaurant finance dashboard with month/year filtering.
- `generic.html` — reusable internal operations review layout.
- `elements.html` — UI component library for dashboard controls and cards.

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
