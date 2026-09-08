# Formulify

An interactive Excel formula reference and calculator, built for the finance team from the team's Excel training workbook.

No build step, no framework, no dependencies to install — it's plain HTML/CSS/JS, so it runs anywhere, including free on GitHub Pages.

## What it does

- 139 Excel functions across 8 categories (Financial, Lookup & Reference, Date & Time, Aggregation, Statistical, Math, Text, Logical)
- Every function has a plain-English description, its syntax, and a **live calculator** — change the inputs and the result recalculates instantly, using finance-themed sample data (cost centres, invoices, depreciation schedules) instead of generic examples
- Search and category browser in the sidebar

## Run it locally

No installation needed. From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. (Any static file server works — `npx serve`, VS Code's Live Server, etc.)

## Deploy to GitHub Pages (public link, no login required)

1. Create a new repository on GitHub (e.g. `formulify`) and push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Formulify"
   git branch -M main
   git remote add origin https://github.com/<your-username>/formulify.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save. GitHub will publish the site at `https://<your-username>.github.io/formulify/` within a minute or two.

No GitHub Actions or build pipeline required — it's static files served as-is.

## Project structure

```
index.html    — page shell and layout
styles.css    — visual design (ledger-inspired theme)
data.js       — the 139 function entries (name, category, syntax, description, inputs)
engine.js     — calculation engine: runs each formula live from the entered inputs
app.js        — UI logic: sidebar, search, and the "Try it" calculator panel
```

## Extending it

To add a function, add an entry to the `FUNCTIONS` array in `data.js` with:
- `name`, `category`, `syntax`, `desc`
- `inputs`: the fields shown in the calculator (`number`, `text`, `date`, or `select`)
- `expr`: a JavaScript expression using the input `id`s as variable names (e.g. `"a+b"`), or the name of a special case handled in `engine.js` for multi-row lookups

## Credits

Function coverage and examples originally sourced from an internal Excel training workbook; descriptions and interactive examples rebuilt for this app with finance-team scenarios.
