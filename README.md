# 🛍️ Vanta Studio

Vanta Studio is a full-stack e-commerce application built with Next.js, TypeScript, Prisma, and SQLite.

It includes a complete shopping flow with authentication, product browsing, search, wishlist, cart management, checkout, order history, and a protected admin dashboard for managing products and orders.

## 🚀 Live Demo

**Live:** https://vanta-studio-delta.vercel.app

## 📸 Screenshots

### Home Page

![Home](./screenshots/home.png)

### Product Page

![Product](./screenshots/product.png)

### Cart

![Cart](./screenshots/cart.png)

### Admin Dashboard

![Admin Dashboard](./screenshots/admin.png)

## ✨ Features

### Customer

- User registration and authentication
- Protected profile
- Browse products
- Product details
- Product search
- Category-based browsing
- Wishlist
- Shopping cart
- Checkout flow
- Order history
- Order details

### Admin

- Protected admin dashboard
- Product management
- Create products
- Edit products
- Delete products
- View orders
- Manage users
- Admin order management

### Application

- Server-side data access with Prisma
- SQLite database
- Authentication and protected routes
- Password hashing with bcrypt
- Request validation with Zod
- REST-style API routes
- React Context for client-side state
- Prisma migrations and seed data

## 🛠 Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

### Backend

- Next.js API Routes
- Prisma ORM
- SQLite
- NextAuth
- bcrypt
- Zod

### Development

- ESLint
- Prisma Studio
- Git
- GitHub

## 📂 Project Structure

```text
src/
├── app/
│   ├── admin/
│   ├── api/
│   ├── cart/
│   ├── checkout/
│   ├── login/
│   ├── signup/
│   ├── profile/
│   ├── products/
│   └── ...
│
├── components/
├── contexts/
├── lib/
├── providers/
└── types/

prisma/
├── migrations/
├── schema.prisma
└── seed.ts

public/
🗄️ Database

Vanta Studio uses Prisma ORM with SQLite for local development.

The database includes models for the application's core commerce functionality, including:

Users
Products
Orders
Order Items
Cart / wishlist-related data
Authentication-related data

Database migrations are stored in:

prisma/migrations/

Seed data can be loaded with:

npm run seed
🔐 Authentication & Authorization

Authentication is handled through NextAuth with Prisma integration.

The application includes:

User registration
Login
Password hashing with bcrypt
Protected routes
Session-based authentication
Role-based access for admin functionality
🔌 API

The application exposes API routes for core application functionality, including authentication, products, cart operations, orders, and other application resources.

Examples:

/api/auth/*
/api/products/*
/api/orders/*
/api/cart/*
⚙️ Getting Started
1. Clone the repository
git clone https://github.com/rohitcreates/vanta-studio.git
2. Enter the project
cd vanta-studio
3. Install dependencies
npm install
4. Configure environment variables

Create a .env file and configure the required database and authentication variables.

Example:

DATABASE_URL="file:./dev.db"

Add any additional authentication variables required by your local configuration.

5. Generate Prisma Client
npx prisma generate
6. Run migrations
npx prisma migrate dev
7. Seed the database
npm run seed
8. Start the development server
npm run dev

The application will be available at:

http://localhost:3000
🧠 What I Learned

Building Vanta Studio gave me practical experience with:

Structuring a full-stack Next.js application
Designing relational database schemas with Prisma
Authentication and authorization
CRUD operations
REST-style API development
Client-side state management with React Context
Form and request validation with Zod
Protected admin functionality
Database migrations and seeding
Building a complete e-commerce workflow
🔮 Future Improvements

Potential improvements include:

PostgreSQL for production-scale database deployment
Payment gateway integration
Product image management
Email verification
Advanced analytics
More extensive admin reporting
Improved production deployment infrastructure
👨‍💻 Author

Rohit Singh

GitHub: https://github.com/rohitcreates

📄 License

This project is built for educational and portfolio purposes.


### One thing before we paste this

I **wouldn't blindly use the rewritten feature list yet**.

We already know the source contains things like admin products/orders/users and NextAuth/Prisma, but README claims should ultimately match the code exactly. So the next move should be a **quick source verification**, not another 45-minute README rabbit hole.

Then we replace `README.md`, commit, push, and **Vanta is done**.

The important part is that the README should sell the engineering work **without inventing features**. That's the standard we're using for every repo now.
https://vanta-studio-delta.vercel.app/

Yep, that’s the correct deployed Vanta Studio URL.

Use this in the README:

## 🚀 Live Demo

**Live:** https://vanta-studio-delta.vercel.app/

So we can replace the old placeholder:

https://your-app.vercel.app

with the real deployment.

For the GitHub repo metadata, the website should also be:

https://vanta-studio-delta.vercel.app/

No need to touch anything else for the URL.

give upadated readme

Absolutely. Here’s the updated Vanta Studio README, with the real deployment URL and the cleanup reflected.

# 🛍️ Vanta Studio

Vanta Studio is a full-stack e-commerce application built with **Next.js, TypeScript, Prisma, and SQLite**.

It provides a complete shopping experience with authentication, product browsing, search, wishlist, cart management, checkout, order history, and a protected admin dashboard for managing products, users, and orders.

---

## 🚀 Live Demo

**Live:** https://vanta-studio-delta.vercel.app/

**Repository:** https://github.com/rohitcreates/vanta-studio

---

## 📸 Screenshots

### Home Page

![Home](./screenshots/home.png)

### Product Page

![Product](./screenshots/product.png)

### Cart

![Cart](./screenshots/cart.png)

### Admin Dashboard

![Admin Dashboard](./screenshots/admin.png)

---

# ✨ Features

## Customer

- User registration
- User login and authentication
- Protected profile
- Browse products
- Product details
- Product search
- Category-based browsing
- Wishlist
- Shopping cart
- Checkout flow
- Order history
- Order details

## Admin

- Protected admin dashboard
- Product management
- Create products
- Edit products
- Delete products
- View orders
- Manage users
- Order management

## Application

- Prisma ORM
- SQLite database
- Authentication and protected routes
- Password hashing with bcrypt
- Request validation with Zod
- REST-style API routes
- React Context for client-side state
- Prisma migrations
- Database seeding

---

# 🛠️ Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

## Backend

- Next.js API Routes
- Prisma ORM
- SQLite
- NextAuth
- bcrypt
- Zod

## Development Tools

- ESLint
- Prisma Studio
- Git
- GitHub

---

# 📂 Project Structure

```text
src/
├── app/
│   ├── admin/
│   ├── api/
│   ├── cart/
│   ├── checkout/
│   ├── login/
│   ├── signup/
│   ├── profile/
│   ├── products/
│   └── ...
│
├── components/
├── contexts/
├── lib/
├── providers/
└── types/

prisma/
├── migrations/
├── schema.prisma
└── seed.ts

public/
🗄️ Database

Vanta Studio uses Prisma ORM with SQLite for database management and local development.

The application uses database models for core e-commerce functionality, including:

Users
Products
Orders
Order Items
Cart data
Wishlist data
Authentication-related data

Database migrations are stored in:

prisma/migrations/

Seed data can be loaded with:

npm run seed
🔐 Authentication & Authorization

Authentication is implemented using NextAuth with Prisma integration.

The application includes:

User registration
Login
Password hashing with bcrypt
Session-based authentication
Protected routes
Role-based authorization
Protected admin functionality
🔌 API

The application uses Next.js API routes for core application functionality.

Examples include:

/api/auth/*
/api/products/*
/api/orders/*
/api/cart/*

These APIs handle functionality such as authentication, product operations, cart management, and orders.

⚙️ Getting Started
1. Clone the repository
git clone https://github.com/rohitcreates/vanta-studio.git
2. Enter the project
cd vanta-studio
3. Install dependencies
npm install
4. Configure environment variables

Create a .env file and configure the required environment variables.

Example:

DATABASE_URL="file:./dev.db"

Add the authentication variables required by your local configuration.

5. Generate Prisma Client
npx prisma generate
6. Run database migrations
npx prisma migrate dev
7. Seed the database
npm run seed
8. Start the development server
npm run dev

The application will be available at:

http://localhost:3000
🧠 What I Learned

Building Vanta Studio gave me practical experience with:

Structuring a full-stack Next.js application
Designing relational database schemas with Prisma
Authentication and authorization
CRUD operations
REST-style API development
Client-side state management with React Context
Request validation with Zod
Protected admin functionality
Database migrations and seeding
Building a complete e-commerce workflow
Managing application state across multiple user flows
🔮 Future Improvements

Potential improvements include:

PostgreSQL for production database deployment
Payment gateway integration
Product image management
Email verification
Advanced analytics
Expanded admin reporting
More robust production infrastructure
👨‍💻 Author

Rohit Singh

GitHub: https://github.com/rohitcreates

📄 License

This project is built for educational and portfolio purposes.
