# Vanta Studio

A full-stack e-commerce application built with **Next.js 16, React 19, TypeScript, Prisma, and PostgreSQL**.

Vanta Studio explores the core workflows of an online storefront: product discovery, customer accounts, cart and wishlist management, checkout, order history, and an admin interface.

> **Project status:** Portfolio project under active improvement. Authentication and authorization are being hardened. Do not use this application to process real customer data or payments.

## Live Demo

[Visit Vanta Studio](https://vanta-studio-delta.vercel.app/)

## Features

### Storefront
- Browse the product catalogue and view product details
- Search and browse products by category
- Manage a shopping cart and wishlist
- Complete the application's checkout flow
- View personal order history

### Accounts and administration
- Register and sign in with email and password
- Password hashing with bcrypt
- Server-managed sessions using NextAuth credentials authentication
- Server-side authorization for product mutations
- Admin dashboard and product management interface

The application is a portfolio project, not a production commerce platform. Payment processing, inventory management, operational monitoring, and comprehensive automated security testing are not implemented.

## Technology

| Area | Tools |
|---|---|
| Application | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | NextAuth v4 Credentials Provider |
| Validation | Zod |
| Password hashing | bcrypt |
| Icons | Lucide React |

## Project structure

```text
src/
├── app/             # App Router pages and API routes
├── components/      # Reusable UI components
├── context/         # Client-side application state
├── data/            # Product seed data
├── lib/             # Authentication, utilities, and Prisma client
├── providers/       # Application providers
└── types/           # Shared TypeScript types

prisma/
├── migrations/      # Database migrations
├── schema.prisma    # Data model
└── seed.ts          # Development seed script
```

## Getting started

### Prerequisites
- Node.js (current LTS release)
- npm
- PostgreSQL

### 1. Clone and install

```bash
git clone https://github.com/rohitcreates/vanta-studio.git
cd vanta-studio
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and replace the database placeholder with your PostgreSQL connection string.

Generate a strong NextAuth secret:

```bash
openssl rand -base64 32
```

Set the generated value as `NEXTAUTH_SECRET`. For local development, set `NEXTAUTH_URL=http://localhost:3000`. In deployment, set `NEXTAUTH_URL` to the canonical application URL and configure a unique secret in the hosting provider's environment settings.

Never commit `.env` or real credentials.

### 3. Prepare the database

```bash
npx prisma generate
npx prisma db push
```

### 4. Seed development products

```bash
npm run seed
```

**Warning:** The current seed script deletes existing products before inserting the sample catalogue. Run it only against a disposable development database.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Replace product data with development seed data |

## Security notes and limitations

- Authentication uses NextAuth credentials with JWT-backed sessions. The session cookie is managed by NextAuth; client-side state is not an authorization boundary.
- Protected API routes resolve the current user on the server. Product mutations require the current database role to be `ADMIN`.
- Order creation derives the owner from the authenticated session. The API does not accept a client-supplied user ID.
- CI currently syncs the Prisma schema to a disposable PostgreSQL database with `prisma db push`; the existing migration history still needs a PostgreSQL baseline before using `prisma migrate deploy` for production database changes.
- Do not use real payment credentials or production customer data.

## Engineering work in progress

- Automated tests for authentication, authorization, checkout, and order access
- CI checks for linting, type checking, and production builds
- Production deployment verification and environment configuration
- Better error handling, rate limiting, and operational logging

## Author

**Rohit Singh**

[GitHub](https://github.com/rohitcreates) · [Repository](https://github.com/rohitcreates/vanta-studio)

## License

Created as a learning and portfolio project.
