# IMRaD Introduction Analysis — Monorepo

A Micro SaaS platform that uses fine-tuned BERT models to automatically classify sentences in scientific introductions according to their **IMRaD move and sub-move** (Territory → Niche → Occupy the Niche).

All services that previously lived in separate repositories have been unified here using **Turborepo** and **pnpm workspaces**.

---

## Research Notebooks

The Jupyter notebooks used to build the dataset and train the BERT models are in [`notebooks/`](./notebooks/).
See [NOTEBOOKS.md](./NOTEBOOKS.md) for a full walkthrough of the three-phase methodology.

---

## Repository Structure

```
imrad-monorepo/
├── apps/
│   ├── web/                  # Next.js frontend + API (Prisma / PostgreSQL)
│   ├── user-data/            # Express + MongoDB — stores introductions & feedback
│   ├── python-services/
│   │   ├── moves/            # FastAPI — IMRaD classification & summarization
│   │   └── pdf-extractor/    # FastAPI — extracts introductions from PDFs
│   └── eureka/               # Spring Boot — service discovery (Eureka Server)
├── packages/
│   └── shared/               # Shared Zod DTOs consumed by web + user-data
├── docker-compose.yml        # Single compose file for all infrastructure
├── turbo.json
└── pnpm-workspace.yaml
```

---

## Prerequisites

| Tool | Version | Used for |
|------|---------|----------|
| Docker & Docker Compose | latest | Infrastructure services |
| Node.js | 20+ | Next.js, Express |
| pnpm | 9+ | Monorepo package manager |
| Python | 3.13 | FastAPI services |
| Java JDK | 17+ | Eureka server |

Install pnpm if needed:
```bash
npm install -g pnpm
```

---

## Infrastructure Setup

All infrastructure (MongoDB, Redis, PostgreSQL, TF-Serving, Nginx) is defined in a single compose file at the repo root.

```bash
# Start everything
docker compose up -d

# Or start only what you need
docker compose up -d mongo redis           # for user-data service
docker compose up -d mongo redis tf-serving  # for full backend
docker compose up -d postgres              # for web (Prisma)

# Stop everything
docker compose down

# Stop and wipe all data volumes
docker compose down -v
```

### Service ports

| Container | Port | Purpose |
|-----------|------|---------|
| `mongo` | 27017 | MongoDB (user-data & feedback) |
| `mongo-express` | 5311 | MongoDB UI |
| `redis` | 6379 | Message broker |
| `tf-serving` | 8501 | TensorFlow model inference |
| `postgres` | 5432 | PostgreSQL (auth, subscriptions) |
| `nginx` | 4000 | Optional reverse proxy |

> **TF-Serving note:** model weight files (`variables.data-*`) are not stored in this repo due to size. Download them from Hugging Face before starting TF-Serving:
> - [moves classifier](https://huggingface.co/stormsidali2001/IMRAD_introduction_moves_classifier)
> - [sub-move classifiers (0, 1, 2)](https://huggingface.co/stormsidali2001)
>
> Place the downloaded files under `apps/python-services/tensorflow-models/models/<model_name>/1/variables/`.

---

## Running the Platform

Each runtime manages its own dependencies independently. There is no single command that installs everything — follow the steps below for each language.

---

### Step 1 — JavaScript / Node.js dependencies

`pnpm install` only installs packages for the JS workspace members: `apps/web`, `apps/user-data`, and `packages/shared`. It does **not** touch Python or Java.

```bash
# Run once from the monorepo root
pnpm install
```

For the Next.js app, also push the Prisma schema to PostgreSQL on first run (requires the `postgres` container to be up):

```bash
cd apps/web
pnpm dlx prisma db push
```

---

### Step 2 — Python dependencies

The two FastAPI services share a single virtual environment at `apps/python-services/.venv`.

```bash
cd apps/python-services

# First time: create the venv and install packages
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Subsequent runs: just activate the existing venv
source .venv/bin/activate
```

> Python 3.13 is recommended. The `requirements.txt` file lists every package needed by both the moves and pdf-extractor services.

---

### Step 3 — Java dependencies (Eureka)

Maven downloads Java dependencies automatically the first time you run the server. No separate install step is needed.

```bash
cd apps/eureka
chmod +x mvnw      # only needed once on macOS / Linux
./mvnw spring-boot:run
```

Maven will fetch all dependencies on first launch (requires internet access). Subsequent starts use the local `~/.m2` cache and are instant.

Dashboard available at [http://localhost:8761](http://localhost:8761).

> Eureka must be running before the Python services start so they can register themselves.

---

### Step 4 — Start the Python services

With the venv active (Step 2):

```bash
# AI moves + summarization service  (port 8000)
cd apps/python-services/moves
uvicorn main:app --reload --port 8000

# PDF extractor service             (port 8010)
cd apps/python-services/pdf-extractor
uvicorn main:app --reload --port 8010
```

---

### Step 5 — Start the JS services

From the monorepo root:

```bash
# Development (hot-reload for all JS services)
pnpm dev

# Or start individual services
pnpm dev:web          # Next.js only       → http://localhost:3000
pnpm dev:user-data    # Express only       → http://localhost:8011
pnpm dev:js           # Both JS services
```

---

### Step 6 — (Optional) Production build

```bash
pnpm build   # builds all JS apps via Turborepo in dependency order
```

---

## Preview / Mock Mode

Preview mode lets you run the **Next.js frontend without any backend services**. All data comes from in-memory mock fixtures and IndexedDB (browser storage).

### Enable preview mode

In `apps/web/.env`:

```env
PREVIEW_MODE=true
NEXT_PUBLIC_PREVIEW_MODE=true
```

### What preview mode does

| Feature | Preview mode behaviour |
|---------|----------------------|
| Introduction analysis | Uses hardcoded mock predictions (no AI calls) |
| Introductions list | Seeded from 5 mock entries; new analyses accumulate in IndexedDB |
| Introduction details | Loaded from IndexedDB (persists across refreshes) |
| Premium sections | Shown using template content from mock data |
| Feedback | UI visible but writes are no-ops |
| Authentication | Still required (Prisma + PostgreSQL must be running) |

### Disable preview mode

Remove or set both vars to `false` and restart the dev server.

---

## Testing

All test commands are run from the **monorepo root**.

### Run everything at once

```bash
pnpm test:all
```

This runs all four suites in sequence and exits non-zero if any suite fails.

### Run individual suites

```bash
# JS services (user-data + web) — requires MongoDB + Redis containers
pnpm test

# user-data only
pnpm test:user-data

# Python services (moves + pdf-extractor)
pnpm test:python

# Eureka Spring Boot integration tests
pnpm test:java
```

### What each suite covers

#### `pnpm test` — user-data (11 tests, vitest + supertest)

Hits a **real MongoDB** container (`imrad-test-db`) and **real Redis**. No mocks on the DB or cache layer.

| Suite | Tests |
|-------|-------|
| `GET /health` | Service liveness |
| `POST /introductions` | Create + 422 on invalid payload |
| `GET /introductions` | Empty list; list after create |
| `GET /introductions/:id` | Fetch by id |
| `GET /introductions/stats` | Aggregate confidence stats |
| `GET /introductions/dashboard/stats` | Dashboard object shape |
| `POST …/feedback/users/:userId` | Attach sentence feedback |
| `GET /introductions/feedbacks` | Paginated feedback list |
| `DELETE …/feedbacks` | Remove feedback |

Requires:
```bash
docker compose up -d mongo redis
```

#### `pnpm test:python` — moves + pdf-extractor (11 tests, pytest)

| Service | Real | Mocked |
|---------|------|--------|
| moves | Redis | TF-Serving (weights missing), LLM (API key), Eureka |
| pdf-extractor | — | Eureka, PyPDF2 reader (deterministic logic tests) |

#### `pnpm test:java` — Eureka (3 tests, Spring Boot Test)

Boots the full Spring context on a random port. Tests context load, `/actuator/health`, and `/eureka/apps`.

### Test isolation

The user-data tests use a dedicated `imrad-test-db` database and wipe all collections between tests. Your production `user-data` database is never touched.

---

## Port Reference

| Service | Port |
|---------|------|
| Next.js (web) | 3000 |
| User-data API | 8011 |
| Moves AI service | 8000 |
| PDF extractor | 8010 |
| Eureka | 8761 |
| TF-Serving REST | 8501 |
| MongoDB | 27017 |
| Redis | 6379 |
| PostgreSQL | 5432 |
| Nginx gateway | 4000 |

---

## License

MIT
