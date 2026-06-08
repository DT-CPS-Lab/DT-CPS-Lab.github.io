# Digital Transformation & Cyberphysical Systems Lab — Website

The public website for the **DT&CPS Lab** at the University of Central Florida (UCF),
Department of Industrial Engineering and Management Systems (IEMS), part of the
Knights Digital Twin Initiative.

PI: Dr. Minas Pantelidakis.

## Tech

Pure static **HTML / CSS / JavaScript** — no framework and no build step.
Pages: `index.html` (About), `people.html`, `projects.html`, `publications.html`,
`research.html`, `contact.html`. Shared styles in `styles.css`, shared behavior in
`script.js`. Images and media live in `media/` and `logo/`.

## Editing & deploying

1. Edit the HTML/CSS/JS files directly.
2. Preview locally by opening `index.html` in a browser (or run a static server, e.g.
   `python -m http.server`).
3. Commit and push to the `main` branch:
   ```bash
   git add -A
   git commit -m "Describe your change"
   git push
   ```
4. **GitHub Pages auto-deploys** every push to `main`; the live site updates within
   ~1–2 minutes.

## Notes

- Asset paths are **case-sensitive** on GitHub Pages (Linux). Match filenames exactly,
  and prefer lowercase paths (e.g. `logo/`, `media/`).
- Large media (banner PNGs, the project MP4) should be compressed before committing to
  keep the site fast — target images under ~400 KB where practical.

## License / Copyright

© 2026 Digital Transformation & Cyberphysical Systems Lab, University of Central Florida —
Dr. Minas Pantelidakis. **All rights reserved.** This is proprietary code: no copying,
modification, distribution, or reuse without prior written permission. See [`LICENSE`](LICENSE).
The repository is public only to enable free GitHub Pages hosting — it is not open source.
