# IMRaD Introduction Analysis

A Micro SaaS that classifies sentences in scientific introductions by their IMRaD move and sub-move (Territory / Niche / Occupy the Niche) using fine-tuned BERT models. Built as part of my graduation thesis.

The code that was spread across three separate repositories has been merged into this Turborepo monorepo.

---

## Research Notebooks

Training notebooks and annotation sheets are in [`notebooks/`](./notebooks/). See the [notebooks README](./notebooks/README.md) for the full methodology.

---

## Repository Structure

```
imrad-monorepo/
├── apps/
│   ├── web/                  # Next.js frontend + API (Prisma / PostgreSQL)
│   ├── user-data/            # Express + MongoDB (introductions & feedback)
│   ├── python-services/
│   │   ├── moves/            # FastAPI: IMRaD classification & summarization
│   │   └── pdf-extractor/    # FastAPI: extracts introductions from PDFs
│   └── eureka/               # Spring Boot: Eureka service registry
├── packages/
│   └── shared/               # Shared Zod DTOs used by web + user-data
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

---

## Prerequisites

| Tool | Version | Used for |
|------|---------|----------|
| Docker & Docker Compose | latest | Infrastructure |
| Node.js | 20+ | Next.js, Express |
| pnpm | 9+ | JS package manager |
| Python | 3.13 | FastAPI services |
| Java JDK | 17+ | Eureka |

```bash
npm install -g pnpm
```

---

## Infrastructure

All containers are defined in `docker-compose.yml` at the repo root.

```bash
# Start everything
docker compose up -d

# Start only what you need
docker compose up -d mongo redis             # user-data tests
docker compose up -d mongo redis tf-serving  # full backend
docker compose up -d postgres                # web / Prisma

docker compose down      # stop
docker compose down -v   # stop + wipe volumes
```

| Container | Port | Purpose |
|-----------|------|---------|
| `mongo` | 27017 | MongoDB |
| `mongo-express` | 5311 | MongoDB UI |
| `redis` | 6379 | Message broker |
| `tf-serving` | 8501 | TensorFlow inference |
| `postgres` | 5432 | PostgreSQL |
| `nginx` | 4000 | Reverse proxy |

> Model weight files (`variables.data-*`) are not in this repo. Download them from Hugging Face and place them under `apps/python-services/tensorflow-models/models/<model_name>/1/variables/`:
> - [moves classifier](https://huggingface.co/stormsidali2001/IMRAD_introduction_moves_classifier)
> - [sub-move classifiers (0, 1, 2)](https://huggingface.co/stormsidali2001)

---

## Running the project

Each language runtime has its own setup. There is no single install command that covers all three.

### JavaScript dependencies

`pnpm install` covers `apps/web`, `apps/user-data`, and `packages/shared` only. It does not touch Python or Java.

```bash
pnpm install
```

On first run, push the Prisma schema to PostgreSQL (requires the `postgres` container):

```bash
cd apps/web
pnpm dlx prisma db push
```

### Python dependencies

Both FastAPI services share one virtualenv at `apps/python-services/.venv`.

```bash
cd apps/python-services
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### Java dependencies (Eureka)

Maven fetches everything on first run. Just start the server:

```bash
cd apps/eureka
chmod +x mvnw    # once, on macOS/Linux
./mvnw spring-boot:run
```

Dashboard at [http://localhost:8761](http://localhost:8761). Start Eureka before the Python services so they can register.

### Starting the Python services

With the venv active:

```bash
cd apps/python-services/moves
uvicorn main:app --reload --port 8000

cd apps/python-services/pdf-extractor
uvicorn main:app --reload --port 8010
```

### Starting the JS services

```bash
pnpm dev           # all JS services with hot reload

pnpm dev:web       # Next.js only        → http://localhost:3000
pnpm dev:user-data # Express only        → http://localhost:8011
pnpm dev:js        # both
```

### Production build

```bash
pnpm build
```

---

## Stripe setup

The app uses Stripe for monthly and yearly premium subscriptions. Add these to `apps/web/.env`:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_YEARLY_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Products and prices:** Create one product in the [Stripe Dashboard](https://dashboard.stripe.com/products) with two recurring prices (monthly and yearly). Copy the `price_...` IDs into the env vars.

**Webhook endpoint:** `POST /api/stripe/webhook`

For local development, forward events with the Stripe CLI:

```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

The CLI prints a `whsec_...` signing secret to paste into `STRIPE_WEBHOOK_SECRET`.

For production, add an endpoint in the Stripe Dashboard under Developers > Webhooks. Set the URL to `https://<your-domain>/api/stripe/webhook` and subscribe to these two events:

- `checkout.session.completed` — upgrades the user to premium after payment
- `customer.subscription.deleted` — resets the user to the free plan on cancellation

Copy the signing secret from the dashboard into `STRIPE_WEBHOOK_SECRET`.

---

## Preview mode

Lets you run the Next.js frontend without any backend. Data comes from in-memory fixtures and IndexedDB.

```env
# apps/web/.env
PREVIEW_MODE=true
NEXT_PUBLIC_PREVIEW_MODE=true
```

| Feature | Behaviour |
|---------|-----------|
| Introduction analysis | Hardcoded mock predictions |
| Introductions list | 5 seeded entries + new analyses saved to IndexedDB |
| Introduction details | Loaded from IndexedDB |
| Premium sections | Template content from mock data |
| Feedback | UI works, writes are no-ops |
| Authentication | Still requires Prisma + PostgreSQL |

Set both vars to `false` (or remove them) and restart to go back to the real backend.

---

## Testing

All commands run from the repo root.

```bash
pnpm test:all       # run every suite in order
pnpm test           # user-data only (vitest + supertest)
pnpm test:user-data # same, explicit filter
pnpm test:python    # moves + pdf-extractor (pytest)
pnpm test:java      # Eureka (Spring Boot Test)
```

The user-data suite needs MongoDB and Redis running:

```bash
docker compose up -d mongo redis
```

**user-data** (11 tests): hits a real MongoDB container (`imrad-test-db`) and real Redis. Covers health, create/read introductions, stats, feedback CRUD.

**Python** (11 tests): Redis is real; TF-Serving and the LLM are mocked because the model weights and the API key are not in the repo.

**Eureka** (3 tests): boots the full Spring context on a random port and checks `/actuator/health` and `/eureka/apps`.

Tests use a dedicated `imrad-test-db` database that gets wiped between each test, so the production database is never touched.

---

## Ports

| Service | Port |
|---------|------|
| Next.js | 3000 |
| User-data API | 8011 |
| Moves service | 8000 |
| PDF extractor | 8010 |
| Eureka | 8761 |
| TF-Serving | 8501 |
| MongoDB | 27017 |
| Redis | 6379 |
| PostgreSQL | 5432 |
| Nginx | 4000 |

---

## License

MIT
