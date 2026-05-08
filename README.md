-# SKYBAR Finance Dashboard — Website File Structure
+# SKYBAR Finance Dashboard
+
+A static, GitHub Pages-ready finance dashboard for browser preview. The project now includes the entry point, supporting pages, styles, scripts, icons, and sample data described by the original repository outline.
+
+## Repository connection audit
+
+- Git repository detected on branch `work`.
+- No Git remote is currently configured, so this checkout is not connected to a GitHub origin yet.
+- Browser entry point verified: `index.html` exists at the repository root.
+- No `package.json` is required because the preview is a dependency-free static site.
+
+## Current file structure
 
 ```txt
-skybar-finance/
-│
+kdems.github.io/
+├── README.md
 ├── index.html
 ├── generic.html
 ├── elements.html
-│
 ├── assets/
 │   ├── css/
 │   │   ├── main.css
-│   │   ├── dashboard.css
-│   │
+│   │   └── dashboard.css
 │   ├── js/
 │   │   ├── app.js
 │   │   ├── dashboard.js
-│   │   ├── calculations.js
-│   │
+│   │   └── calculations.js
 │   ├── img/
-│   │   ├── logo.png
-│   │   ├── bg.jpg
-│   │
-│   ├── icons/
-│   │   ├── dashboard.svg
-│   │   ├── analytics.svg
-│
-├── data/
-│   ├── sample-data.json
-│
-└── README.md
+│   │   └── logo.svg
+│   └── icons/
+│       ├── dashboard.svg
+│       └── analytics.svg
+└── data/
+    └── sample-data.json
 ```
 
-## index.html
+## Browser preview
 
-Main dashboard page.
+Run a local static server from the repository root:
 
-## generic.html
-
-Reusable page template.
-
-## elements.html
+```bash
+python3 -m http.server 8000
+```
 
-UI component library.
+Then open <http://localhost:8000/> in a browser.
 
-## assets/css
+## Pages
 
-Styling files.
+- `index.html` — main dashboard page.
+- `generic.html` — reusable content page template.
+- `elements.html` — starter UI component library.
 
-## assets/js
+## Assets
 
-Logic, dashboard calculations, data binding.
+- `assets/css/` — global and dashboard-specific styling.
+- `assets/js/` — sample data loading, calculations, and dashboard rendering.
+- `assets/img/` — site logo.
+- `assets/icons/` — reusable SVG icons.
+- `data/sample-data.json` — sample quarterly finance data for preview.
 
EOF
)
