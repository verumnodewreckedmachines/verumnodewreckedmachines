# Canonical Base

The canonical implementation of VERUM NODE is the project root containing `client/`, `server/`, and `shared/`.

The `verum-os-distribuicao/` directory is a historical reference copy. New fixes, migrations, deployments, and tests must target the canonical root only.

## Required environment

- `DATABASE_URL`
- `SESSION_SECRET`
- `ADMIN_PASSWORD` for database seeding
- Provider keys only for providers enabled in deployment

## Migration order

1. Run Drizzle migrations against the canonical root.
2. Seed an administrator with a generated password hash.
3. Verify `/api/health` and `/metrics`.
4. Create an authenticated session.
5. Register an Omegamesh node and submit a signed event.

The historical copy must not be used as a deployment source until it is explicitly reconciled with this base.
