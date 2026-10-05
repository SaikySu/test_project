# Khu Vườn Số · Digital Garden

React (Vite) frontend + Express backend. Content lives in `data/garden_content.yaml`; views and comments are stored as JSON in `data/`.

## Run locally

Prerequisite: Node.js 22+

1. `npm install`
2. `npm run dev` (Express + Vite middleware on http://localhost:3000)

Production build: `npm run build && NODE_ENV=production npm start`

The previous standalone HTML version is kept at `public/legacy.html` (served at `/legacy.html`).

## Environment variables

| Variable      | Purpose                                                                 |
|---------------|-------------------------------------------------------------------------|
| `PORT`        | Port to listen on (default 3000; set automatically by Render)          |
| `ADMIN_TOKEN` | If set, saving YAML via `POST /api/content.yaml` requires this token    |
| `DATA_DIR`    | Where to store data files (default `./data`); point at a persistent disk |

## Deploy to Render

1. Push this folder to a GitHub repository.
2. On Render: **New → Blueprint**, pick the repository. `render.yaml` creates a Docker web service and generates `ADMIN_TOKEN`.
3. After deploy, copy `ADMIN_TOKEN` from the service's **Environment** tab; the site asks for it the first time you save YAML.

On the free plan the filesystem is ephemeral: comments, views and YAML edits reset on every deploy or restart. To keep them, use a paid plan with a disk mounted at `/var/data` and set `DATA_DIR=/var/data` (see comments in `render.yaml`). On first start the bundled `data/` files are copied onto the empty disk.
