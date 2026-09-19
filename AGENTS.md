# Anu Kalakriti simple-site operations

## Repository and deployment boundary

- This folder is the **simple static website** repository:
  `pankajipcc/anu-simple`.
- It is separate from `pankajipcc/ANU-JHA`, which is the complex Cursor/full-
  stack project. Never swap their remotes or deploy one in place of the other.
- Vercel imports this repository with `frontend` as its root directory and
  deploys `main` to production. GitHub pushes to `main` are the CI/CD trigger.
- The public website never includes the `studio/` folder: Vercel builds only
  `frontend/`.

## Content locations

- Artworks: `frontend/public/data/artworks.json`
- Site details, including the studio address: `frontend/public/data/settings.json`
- Categories: `frontend/public/data/categories.json`
- Testimonials: `frontend/public/data/testimonials.json`
- Uploaded Studio images: `frontend/public/images/artworks/`

## Local Studio editor

Start it from this repository's `frontend` directory:

```bash
npm run studio
```

Studio runs at `http://localhost:4174`. It lets the user add artwork, upload
images, edit metadata, delete items, and move items up or down in the gallery.
Saving creates a local draft only; it does not update GitHub, Vercel, or the
live website.

Studio also starts a local Vite preview at `http://localhost:4173`. The
**Preview website** button opens it. Refresh the preview after saving a draft
to see the local edits. Do not use it as evidence that a change is live.

## Shipping content

**Ship to website** in Studio performs these actions, in order:

1. Creates the artwork-image folder if necessary.
2. Stages only `frontend/public/data/` and `frontend/public/images/`.
3. Creates a Git commit.
4. Pushes that commit to `origin/main` (`pankajipcc/anu-simple`).
5. Vercel receives the push and automatically redeploys the public site.

If Studio has been updated, restart it before use: stop the old process with
`Ctrl+C` and run `npm run studio` again. If the browser reports a refused
connection, the local Studio process is not running. If `npm run studio` is
not found in PowerShell, use `npm.cmd run studio` or start it from Git Bash.
