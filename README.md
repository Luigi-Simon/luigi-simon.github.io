# Simon Soriano — Personal Portfolio

This repository hosts a static portfolio website built to showcase Simon Christian Luigi Soriano's experience, recent work, and contact information.

## Site structure

- `index.html` — homepage with a quick introduction, current role, and recent projects
- `projects.html` — project showcase page with interactive cards and detailed modals
- `contact.html` — contact page with a direct email link and external profile links
- `style.css` — responsive styling and layout rules
- `script.js` — interaction logic for modal dialogs, scroll reveals, and homepage project previews

## Technologies used

- **HTML5** — semantic structure for accessible, readable pages
- **CSS** — modern layout, typography, and responsive design
- **JavaScript** — UI behavior, smooth reveal animations, dialog modals, and dynamic project loading

## What this website highlights

- A concise landing experience with your current position and personal pitch
- A dynamically generated "What I'm building" section on the homepage that surfaces the latest three projects from `projects.html`
- A polished projects page with cards that open detail modals
- A contact page with a working `mailto:` link and external links for GitHub and LinkedIn

## Local development

Run one of these commands from the repository root:

```powershell
npm run start
```

or

```powershell
python -m http.server 8000
```

Then open the served site in your browser:

- `http://127.0.0.1:8080`
- or `http://127.0.0.1:8000`

## Notes

This project is intentionally simple and static, making it easy to host on GitHub Pages or any basic web server. The code is organized for readability and quick updates.
