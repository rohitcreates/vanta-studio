# Vanta Studio

A full-stack e-commerce application built with **Next.js 16, React 19, TypeScript, Prisma, and PostgreSQL**.

Vanta Studio explores the core workflows of an online storefront: product discovery, customer accounts, cart and wishlist management, checkout, order history, and an admin interface.

> **Project status:** Portfolio project under active improvement. Authentication and authorization are not yet production-ready. Do not use this application to process real customer data or payments.

## Live Demo

[Visit Vanta Studio](https://vanta-studio-delta.vercel.app/)

## Features

### Storefront
- Browse the product catalogue
- View product details
- Search and browse products by category
- Manage a shopping cart
- Save wishlist items
- Complete the application's checkout flow
- View order history and order details

### Account and administration
- Register and sign in with email and password
- Password hashing with bcrypt
- Customer profile and account state
- Admin dashboard interface
- Product and order management interfaces

Some account and admin restrictions currently rely on client-side state. These are being replaced with server-enforced authentication and authorization before the application can be considered production-ready.

## Technology

| Area | Tools |
|---|---|
| Application | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Prisma |
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
├── lib/             # Shared utilities and Prisma client
├── providers/       # Application providers
└── types/           # Shared TypeScript types

prisma/
├── migrations/      # Database migrations
├── schema.prisma    # Data model
└── seed.ts          # Development seed script
```

## Getting started

### Prerequisites
- Node.js (use a current LTS release)
- npm
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/rohitcreates/vanta-studio.git
cd vanta-studio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
```

Replace the placeholders with credentials for your PostgreSQL database. Never commit real credentials.

### 4. Generate Prisma Client and apply migrations

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Seed development products

```bash
npm run seed
```

**Warning:** The current seed script deletes existing products before inserting the sample catalogue. Run it only against a disposable development database.

### 6. Start the development server

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

## Engineering work in progress

The next engineering milestones are:

- Implement server-verified sessions and server-side role checks
- Enforce ownership checks on customer and order APIs
- Restrict product and order mutations to authorized administrators
- Validate and normalize all API inputs
- Add automated tests for authentication, authorization, checkout, and order access
- Add CI checks for linting, type checking, and production builds
- Improve error handling and operational logging

## Author

**Rohit Singh**

[GitHub](https://github.com/rohitcreates) · [Repository](https://github.com/rohitcreates/vanta-studio)

## License

Created as a learning and portfolio project.
