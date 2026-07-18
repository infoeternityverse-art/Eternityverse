# GPU Cloud Marketplace

Phase 1 MVP for a professional GPU cloud marketplace. Customers can browse GPU rental packages, submit enquiries, and view manually issued credentials from a protected dashboard. Admins can manage packages, review enquiries, issue credentials, manage customers, and inspect audit logs.

## Tech Stack

- Frontend: Vite, React JSX, React Router DOM, Tailwind CSS, Axios, TanStack Query, Zustand, React Hook Form, Zod, Lucide React.
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt.
- Language: JavaScript and JSX only.

## Requirements

- Node.js 20+
- npm 10+
- MongoDB connection string

## Setup

```bash
npm install
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Set strong production values for JWT secrets and `CREDENTIAL_ENCRYPTION_KEY` before deploying.

## Scripts

```bash
npm run dev
npm run dev:frontend
npm run dev:backend
npm run build
npm run start
npm run lint
npm run format
npm run format:check
```

## Quality Gates

Run these before release:

```bash
npm run format:check
npm run lint
npm run build
```

## Documentation

- API reference: [docs/API.md](docs/API.md)
- Deployment checklist: [docs/DEPLOYMENT_CHECKLIST.md](docs/DEPLOYMENT_CHECKLIST.md)
- MVP release checklist: [docs/MVP_RELEASE_CHECKLIST.md](docs/MVP_RELEASE_CHECKLIST.md)
- Changelog: [CHANGELOG.md](CHANGELOG.md)

## Security Notes

- Access tokens are sent with `Authorization: Bearer <token>`.
- Password hashes are never selected or returned by default.
- Credential secrets are encrypted at rest for new writes.
- Admin APIs require admin role authorization.
- Customer APIs require customer role authorization and service-level customer scoping.
- Helmet, CORS, JSON body limits, request rate limiting, and Mongo operator sanitization are enabled.
