# Deployment notes

This repository is the **simple static Vercel site** for Anu Kalakriti.

- GitHub repository: `pankajipcc/anu-simple`
- Vercel project root directory: `frontend`
- Production branch: `main`
- CI/CD is enabled through Vercel's GitHub integration: every push to `main`
  automatically deploys the live site.
- Artwork and site content live in `frontend/public/data/`.
- The local content editor lives in `studio/`. Run it from Git Bash with
  `cd frontend && npm run studio`; its **Ship to website** button commits and
  pushes content changes to `main`, which triggers Vercel.

Do not connect this project to `pankajipcc/ANU-JHA`; that repository is the
separate complex Cursor/full-stack build.
