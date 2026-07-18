# Deployment Checklist

## Environment

- Set `NODE_ENV=production`.
- Set `MONGO_URI` to the production MongoDB connection string.
- Set `CORS_ORIGIN` to the production frontend origin.
- Set long, unique `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` values.
- Set a strong `CREDENTIAL_ENCRYPTION_KEY` and store it in the secret manager.
- Configure `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX` for expected traffic.
- Confirm frontend `VITE_API_BASE_URL` points to the production API.

## Build

- Run `npm install`.
- Run `npm run format:check`.
- Run `npm run lint`.
- Run `npm run build`.

## Database

- Confirm MongoDB backups are enabled.
- Confirm indexes are built.
- Confirm least-privilege database credentials are used.
- Seed or create the first admin account through an approved operational process.

## Security

- Enforce HTTPS at the load balancer or hosting layer.
- Verify CORS allows only trusted origins.
- Verify rate limiting is enabled.
- Verify logs do not include credential secrets, JWTs, or passwords.
- Rotate initial bootstrap credentials after first login.

## Operations

- Configure process monitoring.
- Configure API health checks.
- Configure log collection.
- Configure error alerting.
- Document rollback steps for frontend and backend deployments.
