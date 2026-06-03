# Simon Soriano — Portfolio

A simple static site that shows who I am, what I’m working on, and how to reach me.

## What’s here

- `index.html` — homepage with a quick intro, current role, and the latest projects
- `projects.html` — project showcase with cards and detail modals
- `contact.html` — email link plus GitHub and LinkedIn
- `style.css` — layout and styling
- `script.js` — page interactions, modal behavior, and homepage project previews

## Tech stack

- HTML
- CSS
- JavaScript

No build tools. No frameworks. Just a clean static site ready for GitHub Pages or any simple host.

## Why it’s set up this way

- keeps the homepage light and focused
- pulls the latest 3 projects from `projects.html`
- lets the project page stay as the source of truth for project details
- keeps everything easy to update

## Run it locally

From the repo root:

```powershell
npm run start
```

or

```powershell
python -m http.server 8000
```

Then open whichever address matches your server:

- `http://127.0.0.1:8080`
- `http://127.0.0.1:8000`

## Notes

This README is meant to be short and straightforward — just enough to explain the site and how it works.
