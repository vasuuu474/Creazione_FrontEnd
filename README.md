# Creazione Workspace (CollabHub)

A React + Vite dashboard app for managing a project's scope, founder, and team. Built with **Tailwind v4 + shadcn/ui** for UI, **Zustand** for state, and an **axios** API layer that's ready to plug into a real backend.

This README is written for anyone new to the codebase — read it top to bottom once and you'll know where everything lives and why.

## Tech stack

| Concern | Tool |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| UI components | [shadcn/ui](https://ui.shadcn.com) (in `src/components/ui/`) |
| State management | [Zustand](https://github.com/pmndrs/zustand) (in `src/store/`) |
| HTTP client | [axios](https://axios-http.com), with interceptors (in `src/api/`) |
| Icons | lucide-react |

## Getting started

```bash
npm install
cp .env.example .env   # optional — only needed once you have a real backend
npm run dev            # start the dev server at http://localhost:5173
```

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint       # eslint
```

### Running with Docker instead

No local Node install needed — everything runs in a container.

```bash
docker compose up app-dev     # hot-reloading dev server → http://localhost:5173
docker compose up app          # production build served by nginx → http://localhost:8080
```

`app-dev` mounts your source into the container, so edits on your machine hot-reload same as `npm run dev`. `app` runs `npm run build` inside the image and serves the static output with nginx — this is what you'd actually deploy. If port `8080` (or `5173`) is already taken on your machine, edit the left-hand side of the `ports:` mapping in `docker-compose.yml`, e.g. `"8081:80"`.

Build without compose:

```bash
docker build --target dev -t creazione-frontend:dev .
docker build --target production -t creazione-frontend:prod .
```

## The big idea: pages → features → shared

The codebase is organized around one rule: **business logic lives with the feature it belongs to, not in one giant page file.** Everything flows in one direction:

```
pages/        "which route am I on?"          — thin, just wires a route to a feature
  ↓
features/     "what does this part of the app do?" — pages, components, hooks, all owned by one feature
  ↓
store/ · api/ · components/ · lib/   shared building blocks any feature can use
```

If you're an intern adding something, ask: *"is this specific to one feature, or usable by the whole app?"* Feature-specific → put it inside that feature's folder. Shared → put it in `store/`, `api/`, `components/common/` or `components/ui/`.

## Folder structure

```
src/
├── pages/                     # One file per route. Thin re-exports only.
│   └── WorkspacePage.jsx      #   → re-exports features/workspace/WorkspacePage
│
├── features/                  # One folder per feature/screen. This is where the real work happens.
│   └── workspace/
│       ├── WorkspacePage.jsx  # The actual page: composes everything below, reads from stores
│       ├── components/        # Components used ONLY by this feature
│       │   ├── layout/        #   Navbar, Sidebar (feature-specific chrome)
│       │   ├── project/       #   ProjectHeader, FounderCard, TeamCard, etc. (presentational cards)
│       │   ├── modals/        #   CreateIdeaModal, ContactFounderModal, etc.
│       │   ├── Toast.jsx
│       │   └── EditWorkspaceHeaderForm.jsx
│       └── hooks/              # Small hooks that compose store state into feature-specific logic
│           ├── useIsFounder.js
│           ├── useHeaderEditing.js
│           └── useTeamActions.js
│
├── store/                     # Zustand stores — shared app state, grouped by concern
│   ├── useAuthStore.js         #   current user, switch user
│   ├── useProjectStore.js      #   the project record (title, scope, tags, founder...)
│   ├── useMembersStore.js      #   the team roster
│   └── useUIStore.js           #   which modal/view is open, toast messages
│
├── api/                        # Everything about talking to a backend
│   ├── client.js                #   the one axios instance (baseURL, timeout)
│   ├── interceptors.js          #   request/response interceptor functions
│   └── endpoints/                #   one file per resource — thin functions calling apiClient
│       ├── projectApi.js
│       ├── membersApi.js
│       └── founderApi.js
│
├── components/                 # Shared across ALL features (not feature-specific)
│   ├── ui/                       #   shadcn primitives — Button, Card, Badge... don't hand-edit heavily, regenerate via shadcn CLI
│   └── common/                   #   small shared building blocks — Logo, Tag, NavItem
│
├── data/mock/                  # Seed/mock data, used as initial store state + API fallback
│   └── projectData.js
│
├── lib/
│   └── utils.js                 #   `cn()` helper for merging Tailwind classes
│
├── App.jsx                      # Renders the current page
└── main.jsx                     # React entry point
```

### Where do I put a new file?

| I'm adding... | It goes in... |
|---|---|
| A new route/screen | `src/pages/<Name>Page.jsx` (thin) + `src/features/<name>/` (the real thing) |
| A component only that screen uses | `src/features/<name>/components/` |
| A component multiple screens will reuse | `src/components/common/` |
| A new shadcn primitive | `npx shadcn add <component>` → lands in `src/components/ui/` |
| Shared app state (used by 2+ features) | a new or existing store in `src/store/` |
| A call to a backend endpoint | `src/api/endpoints/<resource>Api.js` |
| A hook that's specific to one feature | `src/features/<name>/hooks/` |

## State management (Zustand)

We don't keep app state in one big `useState` blob on the page. Instead, each store owns one concern:

- **`useAuthStore`** — who's logged in.
- **`useProjectStore`** — the project's data (title, scope, tags, founder, member slots).
- **`useMembersStore`** — the full team roster.
- **`useUIStore`** — UI-only state: which modal is open, which sidebar view is active, the current toast message.

A component reads only the slice it needs:

```jsx
import { useProjectStore } from '@/store/useProjectStore'

function ProjectTitle() {
  const title = useProjectStore((state) => state.project.title)
  return <h1>{title}</h1>
}
```

**Rule of thumb — global store vs. local `useState`:**
- Shared/business data (the project, the team, who's logged in, which modal is open) → **Zustand store**.
- Ephemeral form input while a modal is open (e.g. the text you're typing into "Create Idea") → **local `useState` inside that component**. It gets thrown away when the modal closes, so it doesn't need to live in global state.

See `src/features/workspace/hooks/useTeamActions.js` for an example of a hook that *composes* two stores together (keeping the team roster and the project's displayed members in sync) instead of every caller re-deriving that logic.

## API layer (axios + interceptors)

`src/api/client.js` creates a single axios instance used everywhere:

```js
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
})
```

`src/api/interceptors.js` attaches two behaviors to every request/response:
- **Request interceptor** — attaches an `Authorization` header from `useAuthStore` if a token exists.
- **Response interceptor** — unwraps `response.data` automatically (so callers get plain data back, not the axios envelope), normalizes errors into plain `Error` objects, and logs the user out on a `401`.

`src/api/endpoints/*.js` are thin, one-liner functions per resource:

```js
// src/api/endpoints/projectApi.js
export const getProject = () => apiClient.get('/projects/current')
export const updateProject = (project) => apiClient.put(`/projects/${project.id ?? 'current'}`, project)
```

Store actions call these endpoints. **There's no backend wired up yet** — so every store action applies its change to local state first (optimistic update), then tries the API call, and just keeps the local change if the call fails. This means the app works fully today with mock data, and the moment a real backend exists, you only need to:
1. Set `VITE_API_BASE_URL` in `.env` (copy from `.env.example`).
2. Make sure your backend's response shapes match what the store expects.

No component code needs to change.

## Design system

Brand colors, typography, and component styling conventions are documented separately in [`DESIGN.md`](./DESIGN.md). UI primitives (buttons, cards, dropdowns...) come from shadcn — regenerate/add new ones with:

```bash
npx shadcn add <component-name>
```

## Docker files (repo root)

| File | Purpose |
|---|---|
| `Dockerfile` | Multi-stage build: `dev` (Vite dev server) and `production` (static build served by nginx) |
| `docker-compose.yml` | Defines the `app-dev` and `app` services described above |
| `nginx.conf` | Serves `dist/` in production, with SPA fallback + static asset caching |
| `.dockerignore` | Keeps `node_modules`, `.env`, `.git`, etc. out of the image build context |

## Path aliases

`@/` maps to `src/` (configured in `vite.config.js` and `jsconfig.json`), so imports read cleanly regardless of how deep a file is nested:

```js
import { Button } from '@/components/ui/button'
import { useProjectStore } from '@/store/useProjectStore'
```
